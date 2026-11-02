import { useState } from "react";
import Row from "./Row";
import BoardStatusBar from "./BoardToolBar";
import { FLAIRS, STATUSES } from "../constants";

const Board = ({ tickets = [], onToggleTicket, onDeleteTicket }) => {
  const [filters, setFilters] = useState({
    statuses: STATUSES,
    project: "all",
    author: "all",
    flair: "all",
  });

  function handleFilterChange(name, value) {
    setFilters((prev) => ({ ...prev, [name]: value }));
  }

  const options = {
    statuses: STATUSES,
    projects: [...new Set(tickets.map((ticket) => ticket.project))],
    authors: [...new Set(tickets.map((ticket) => ticket.author))],
    flairs: FLAIRS,
  };

  const counts = {
    open: tickets.filter((ticket) => !ticket.is_resolved).length,
    resolved: tickets.filter((ticket) => ticket.is_resolved).length,
  };

  const visibleTickets = tickets.filter((ticket) => {
    const ticketStatus = ticket.is_resolved ? "resolved" : "open";

    return (
      filters.statuses.includes(ticketStatus) &&
      (filters.project === "all" || filters.project === ticket.project) &&
      (filters.author === "all" || filters.author === ticket.author) &&
      (filters.flair === "all" || filters.flair === ticket.flair)
    );
  });

  const newestFirst = [...visibleTickets].sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at),
  );

  const groups = new Map();
  for (const ticket of newestFirst) {
    if (!groups.has(ticket.project)) groups.set(ticket.project, []);
    groups.get(ticket.project).push(ticket);
  }

  const sortedGroups = [...groups].sort(([a], [b]) => a.localeCompare(b));

  return (
    <>
      <h2>Bug Board</h2>

      <BoardStatusBar
        filters={filters}
        options={options}
        counts={counts}
        onChange={handleFilterChange}
      ></BoardStatusBar>

      {sortedGroups.length === 0 && <p>No tickets found.</p>}

      {sortedGroups.map(([project, projectTickets]) => (
        <section key={project}>
          <h3>
            {project} ({projectTickets.length})
          </h3>
          <ul>
            {projectTickets.map((ticket) => (
              <Row
                key={ticket.id}
                ticket={ticket}
                onToggleTicket={onToggleTicket}
                onDeleteTicket={onDeleteTicket}
              ></Row>
            ))}
          </ul>
        </section>
      ))}
    </>
  );
};

export default Board;
