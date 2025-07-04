import React, { useState } from "react";

// Filterable blood groups
const bloodGroups = [
  "", "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"
];

// PUBLIC_INTERFACE
function SearchDonorPage() {
  const [filters, setFilters] = useState({
    bloodGroup: "",
    city: "",
    minAge: "",
    maxAge: ""
  });
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // PUBLIC_INTERFACE
  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  // PUBLIC_INTERFACE
  const handleSearch = (e) => {
    e.preventDefault();
    setIsSearching(true);
    // Stub donor result (simulate API based on filters)
    setTimeout(() => {
      let stubData = [
        {
          id: "1",
          name: "Aarti Sharma",
          age: 28,
          bloodGroup: "B+",
          city: "Delhi",
          phone: "9001002222",
        },
        {
          id: "2",
          name: "Rahul Mehta",
          age: 35,
          bloodGroup: "O-",
          city: "Pune",
          phone: "9891567001",
        },
        {
          id: "3",
          name: "Priya Joshi",
          age: 22,
          bloodGroup: "A+",
          city: "Mumbai",
          phone: "9876123456",
        },
      ];
      // Trivial front-end filtering
      stubData = stubData.filter((d) => {
        if (filters.bloodGroup && d.bloodGroup !== filters.bloodGroup) return false;
        if (filters.city && !d.city.toLowerCase().includes(filters.city.toLowerCase())) return false;
        if (filters.minAge && d.age < +filters.minAge) return false;
        if (filters.maxAge && d.age > +filters.maxAge) return false;
        return true;
      });
      setResults(stubData);
      setIsSearching(false);
    }, 600);
  };

  return (
    <div className="card" aria-label="Search blood donor">
      <div className="card-title">Find a Donor</div>
      <div className="card-desc">
        Search for potential blood donors using filters.
      </div>
      <form onSubmit={handleSearch} style={{ marginBottom: "1em" }}>
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
        <div style={{display:'flex', gap:'0.9em'}}>
          <div style={{flex:1}}>
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
          <div style={{flex:1}}>
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
        <button type="submit" aria-label="Search for donor" style={{marginTop:10}}>
          {isSearching ? "Searching..." : "Search"}
        </button>
      </form>
      <div>
        {results.length > 0 ? (
          <table className="donor-table" aria-label="Donor results">
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
                <tr key={d.id}>
                  <td>{d.name}</td>
                  <td>{d.bloodGroup}</td>
                  <td>{d.city}</td>
                  <td>{d.age}</td>
                  <td>
                    <a href={`tel:${d.phone}`} style={{color:"var(--color-primary)",fontWeight:600,textDecoration:"none"}}>
                      {d.phone}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          isSearching ? null :
          <div style={{ color: "var(--color-accent)", marginTop: 10 }}>
            {results.length === 0 && "No donors found. Try another filter."}
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchDonorPage;
