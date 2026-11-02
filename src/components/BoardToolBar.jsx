import { Link } from "react-router";
import DropdownMenu from "./DropdownMenu";

const BoardToolBar = ({ filters, options, counts, onChange }) => {
  function toggleStatus(status) {
    return filters.statuses.includes(status)
      ? filters.statuses.filter((s) => s !== status)
      : [...filters.statuses, status];
  }

  return (
    <div className="filter-row">
      {options.statuses.map((status) => (
        <label key={status}>
          <input
            type="checkbox"
            name="status"
            value={status}
            checked={filters.statuses.includes(status)}
            onChange={() => onChange("statuses", toggleStatus(status))}
          />
          {status.charAt(0).toUpperCase() + status.slice(1)} : {counts[status]}
        </label>
      ))}

      <DropdownMenu
        label="projects"
        data={options.projects}
        value={filters.project}
        onChange={(value) => onChange("project", value)}
      ></DropdownMenu>
      <DropdownMenu
        label="authors"
        data={options.authors}
        value={filters.author}
        onChange={(value) => onChange("author", value)}
      ></DropdownMenu>
      <DropdownMenu
        label="flairs"
        data={options.flairs}
        value={filters.flair}
        onChange={(value) => onChange("flair", value)}
      ></DropdownMenu>
      <Link to="/new" className="btn-primary">
        New Ticket
        <i className="fa-solid fa-plus" aria-hidden="true"></i>
      </Link>
    </div>
  );
};

export default BoardToolBar;
