import React, { createContext, useState } from "react";

// Dummy seeded donors for realism, can be mutated at runtime.
const initialDonors = [
  {
    id: "1",
    name: "Aarti Sharma",
    age: 28,
    bloodGroup: "B+",
    city: "Delhi",
    phone: "9001002222",
    email: "aarti.sharma@email.com"
  },
  {
    id: "2",
    name: "Rahul Mehta",
    age: 35,
    bloodGroup: "O-",
    city: "Pune",
    phone: "9891567001",
    email: "rahul.mehta@email.com"
  },
  {
    id: "3",
    name: "Priya Joshi",
    age: 22,
    bloodGroup: "A+",
    city: "Mumbai",
    phone: "9876123456",
    email: "priya.joshi@email.com"
  }
];

// Context to provide donor in-memory operations and notifications
export const DonorContext = createContext();

// PUBLIC_INTERFACE
export function DonorProvider({ children }) {
  const [donorList, setDonorList] = useState(initialDonors);
  const [notification, setNotification] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // PUBLIC_INTERFACE
  // Add donor (simulate add)
  function addDonor(donor) {
    setIsLoading(true);
    setTimeout(() => {
      setDonorList(prev => [donor, ...prev]);
      setIsLoading(false);
    }, 600);
  }

  // PUBLIC_INTERFACE
  // Notification pop-ups
  function showNotification(msg, type = "success") {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 2100);
  }

  // PUBLIC_INTERFACE
  // Context value for children
  const value = {
    donorList,
    addDonor,
    showNotification,
    notification,
    isLoading,
  };

  return (
    <DonorContext.Provider value={value}>
      {notification && (
        <div
          className={`global-notify ${notification.type === "error" ? "global-err" : "global-succ"}`}
          role={notification.type === "error" ? "alert" : "status"}
          style={{
            position: "fixed",
            zIndex: 9999,
            top: 15,
            left: "50%",
            transform: "translateX(-50%)",
            background: notification.type === "error" ? "#b71c1c" : "#318a4c",
            color: "#fff",
            fontWeight: 600,
            borderRadius: 8,
            boxShadow: "0 4px 20px rgba(0,0,0,0.21)",
            padding: "0.95em 1.7em",
            opacity: 0.98,
            fontSize: "1.08em",
            transition: "all 0.34s",
            animation: "slide-notify 0.5s",
          }}
        >
          {notification.msg}
        </div>
      )}
      {children}
      <style>
        {`
        @keyframes slide-notify {
          0% { opacity: 0; transform: translate(-50%, -25px);}
          80% { opacity: 1; }
          100% { opacity: 1; transform: translate(-50%, 0);}
        }
        .effect-card {
          box-shadow: 0 4.5px 18px 1.5px rgba(170,20,20,0.11);
          transition: box-shadow 0.22s, transform 0.13s;
        }
        .effect-card:hover, .effect-card:focus-within {
          box-shadow: 0 8.5px 20px 2px rgba(211,47,47,0.18), 0 1.5px 6px rgba(0,0,0,0.08);
          transform: translateY(-2px) scale(1.012);
        }
        .animated-btn {
          transition: background 0.18s, transform 0.13s;
        }
        .animated-btn:hover, .animated-btn:focus {
          background: var(--button-bg-hover);
          transform: scale(1.03);
          outline: 2.5px solid var(--color-primary);
        }
        .animation-pop {
          animation: pop-fade-in 0.45s;
        }
        @keyframes pop-fade-in {
          0% { opacity: 0; transform: scale(0.85);}
          95% { opacity: 1; }
          100% { opacity: 1; transform: scale(1); }
        }
        .effect-table tbody tr:hover, .effect-table tbody tr:focus-within {
          background: rgba(211,47,47,0.12);
        }
        `}
      </style>
    </DonorContext.Provider>
  );
}
