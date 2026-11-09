const Row = ({ ticket, onToggleTicket, onDeleteTicket }) => {
  return (
    <li className={`ticket-row ${ticket.is_resolved ? "is-resolved" : ""}`}>
      <article>
        <h4 className="row-title">{ticket.title}</h4>
        {ticket.description && <p>{ticket.description}</p>}
        <div className="ticket-meta">
          <span className={`badge badge-${ticket.flair}`}>{ticket.flair}</span>
          <span>by {ticket.author}</span>
        </div>
      </article>
      <div className="ticket-actions">
        <button
          className="resolve-btn"
          onClick={() => onToggleTicket(ticket.id, ticket.is_resolved)}
        >
          {ticket.is_resolved ? "Reopen" : "Resolve"}
        </button>
        <button
          title="Delete ticket"
          aria-label="Delete ticket"
          onClick={() => onDeleteTicket(ticket.id)}
        >
          <i className="fa-regular fa-trash-can" aria-hidden="true"></i>
        </button>
      </div>
    </li>
  );
};

export default Row;
