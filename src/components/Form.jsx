import { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router";
import { FLAIRS } from "../constants";

const Form = ({ onCreateTicket }) => {
  const EMPTY_FORM = {
    project: "",
    title: "",
    description: "",
    author: "",
    flair: "bug",
  };

  const [formData, setFormData] = useState(EMPTY_FORM);

  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const ticket = {
        ...formData,
        project: formData.project.trim(),
        title: formData.title.trim(),
        description: formData.description.trim(),
        author: formData.author.trim(),
      };

      if (!ticket.project || !ticket.title || !ticket.author) {
        toast.error("Please fill in all required fields.");
        return;
      }

      await onCreateTicket(formData);

      setFormData(EMPTY_FORM);
      toast.success("Ticket created successfully!");
    } catch (error) {
      console.error("Failed to create ticket:", error);
      toast.error("Failed to create ticket!");
    } finally {
      setLoading(false);
    }
  }
  return (
    <form className="ticket-form" onSubmit={handleSubmit}>
      <h2>Create New Ticket</h2>

      <label htmlFor="project">Project</label>
      <input
        id="project"
        name="project"
        type="text"
        value={formData.project}
        onChange={handleChange}
        required
      />

      <label htmlFor="title">Title</label>
      <input
        id="title"
        name="title"
        type="text"
        maxLength={120}
        value={formData.title}
        onChange={handleChange}
        required
      />

      <label htmlFor="description">Description</label>
      <textarea
        id="description"
        name="description"
        maxLength={2000}
        value={formData.description}
        onChange={handleChange}
      />

      <label htmlFor="author">Author</label>
      <input
        id="author"
        name="author"
        type="text"
        maxLength={50}
        value={formData.author}
        onChange={handleChange}
        required
      />

      <label htmlFor="flair">Flair</label>
      <select
        id="flair"
        name="flair"
        value={formData.flair}
        onChange={handleChange}
      >
        {FLAIRS.map((flair) => (
          <option key={flair} value={flair}>
            {flair.charAt(0).toUpperCase() + flair.slice(1)}
          </option>
        ))}
      </select>

      <div className="ticket-form-btn-row">
        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? "Creating..." : "Create Ticket"}
        </button>
        <Link to="/" className="btn-primary">
          Home
          <i className="fa-solid fa-house" aria-hidden="true"></i>
        </Link>
      </div>
    </form>
  );
};

export default Form;
