import { useEffect, useRef, useState } from "react";
import SearchBar from "./SearchBar";

const DropdownMenu = ({ label, data, value, onChange }) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const containerRef = useRef(null);

  useEffect(() => {
    if (!open) return;

    function handleMouseDown(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
        setQuery("");
      }
    }

    function handleKeyDown(e) {
      if (e.key === "Escape") {
        setOpen(false);
        setQuery("");
      }
    }

    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const keyword = query.trim().toLowerCase();
  const matches = data.filter((option) =>
    String(option).toLowerCase().includes(keyword),
  );

  function closeMenu() {
    setOpen(false);
    setQuery("");
  }

  function handleSelect(option) {
    onChange(option === value ? "all" : option);
    closeMenu();
  }

  return (
    <div className="dropdown" ref={containerRef}>
      <button
        type="button"
        className="dropdown-toggle"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => (open ? closeMenu() : setOpen(true))}
      >
        <span>{label}</span>
        <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
      </button>

      {open && (
        <div className="dropdown-panel">
          <SearchBar
            placeholder={`Search ${label}...`}
            value={query}
            onChange={setQuery}
            autoFocus
          />

          <ul className="dropdown-list" role="listbox" aria-label={label}>
            {matches.map((option) => (
              <li key={option}>
                <button
                  type="button"
                  className="dropdown-option"
                  aria-current={value === option}
                  onClick={() => handleSelect(option)}
                >
                  {option}
                </button>
              </li>
            ))}

            {matches.length === 0 && (
              <li className="dropdown-empty">No results</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
