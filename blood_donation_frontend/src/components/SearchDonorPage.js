import React, { useState, useContext } from "react";
import { DonorContext } from "./_DonorContext";

// Filterable blood groups
const bloodGroups = [
  "", "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"
];

// Spinner
function SpinnerMini() {
  return (
    <span
      style={{
        display: "inline-block",
        width: 15,
        height: 15,
        border: "3px solid var(--color-primary)",
        borderBottomColor: "transparent",
        borderRadius: "50%",
        animation: "spin 1s linear infinite",
        marginRight: 8,
      }}
    />
  );
}

// PUBLIC_INTERFACE
function SearchDonorPage() {
  const { donorList, isLoading } = useContext(DonorContext);
  const [filters, setFilters] = useState({
    bloodGroup: "",
    city: "",
    minAge: "",
    maxAge: ""
  });
  const [results, setResults] = useState([]);
  const [searching, setSearching] = useState(false);

  // PUBLIC_INTERFACE
  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  // PUBLIC_INTERFACE
  const handleSearch = (e) => {
    e.preventDefault();
    setSearching(true);
    setResults([]);
    setTimeout(() => {
      let dataList = donorList;
      // Filter in-memory
      dataList = dataList.filter((d) => {
        if (filters.bloodGroup && d.bloodGroup !== filters.bloodGroup) return false;
        if (filters.city && !d.city.toLowerCase().includes(filters.city.toLowerCase())) return false;
        if (filters.minAge && d.age < +filters.minAge) return false;
        if (filters.maxAge && d.age > +filters.maxAge) return false;
        return true;
      });
      setResults(dataList);
      setSearching(false);
    }, 600);
  };

  return (
    <div className="card effect-card" aria-label="Search blood donor">
      <div className="card-title" tabIndex="0">Find a Donor</div>
      <div className="card-desc">
        Search for potential blood donors using filters.
      </div>
      <form onSubmit={handleSearch} style={{ marginBottom: "1em" }} aria-label="Donor search form">
        <label htmlFor="bloodGroup">Blood Group</label>
        <select
          name="bloodGroup"
          id="bloodGroup"
          value={filters.bloodGroup}
          onChange={handleChange}
        >
          {bloodGroups.map(bg => (
            <option key={bg} value={bg}>
              {bg ? bg : "-- Any --"}
            </option>
          ))}
        </select>
        <label htmlFor="city">City</label>
        <input
          name="city"
          id="city"
          type="text"
          placeholder="Enter city"
          value={filters.city}
          onChange={handleChange}
        />
        <div style={{ display: 'flex', gap: '0.9em' }}>
          <div style={{ flex: 1 }}>
            <label htmlFor="minAge">Min Age</label>
            <input
              name="minAge"
              id="minAge"
              type="number"
              min={18}
              max={70}
              value={filters.minAge}
              onChange={handleChange}
              placeholder="18"
            />
          </div>
          <div style={{ flex: 1 }}>
            <label htmlFor="maxAge">Max Age</label>
            <input
              name="maxAge"
              id="maxAge"
              type="number"
              min={18}
              max={70}
              value={filters.maxAge}
              onChange={handleChange}
              placeholder="70"
            />
          </div>
        </div>
        <button
          type="submit"
          aria-label="Search for donor"
          style={{
            marginTop: 10,
            background: searching ? "var(--color-accent)" : undefined,
            transition: "background 0.19s"
          }}
          className="animated-btn"
          disabled={searching}
        >
          {searching ? (<><SpinnerMini /> Searching...</>) : "Search"}
        </button>
      </form>
      <div>
        {results.length > 0 ? (
          <table className="donor-table animation-pop effect-table" aria-label="Donor results">
            <thead>
              <tr>
                <th>Name</th>
                <th>Blood</th>
                <th>City</th>
                <th>Age</th>
                <th>Phone</th>
              </tr>
            </thead>
            <tbody>
              {results.map(d => (
                <tr key={d.id} style={{ transition: "background 0.2s" }}>
                  <td tabIndex="0">{d.name}</td>
                  <td>{d.bloodGroup}</td>
                  <td>{d.city}</td>
                  <td>{d.age}</td>
                  <td>
                    <a
                      href={`tel:${d.phone}`}
                      style={{
                        color: "var(--color-primary)",
                        fontWeight: 600,
                        textDecoration: "none",
                        outline: "none"
                      }}
                      tabIndex="0"
                      aria-label={`Call donor at ${d.phone}`}
                    >
                      {d.phone}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          searching || isLoading ? (
            <div style={{ color: "var(--color-primary)" }}>
              <SpinnerMini /> Loading donors...
            </div>
          ) : (
            <div style={{ color: "var(--color-accent)", marginTop: 10 }}>
              No donors found. Try another filter.
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default SearchDonorPage;
