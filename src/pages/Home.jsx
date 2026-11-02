import { supabase } from "../client";
import { useEffect, useState } from "react";
import Board from "../components/Board";
import toast from "react-hot-toast";

const Home = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    async function fetchTickets() {
      const { data, error } = await supabase.from("Tickets").select("*");
      console.log(data);
      if (error) throw error;

      setTickets(data);
    }

    fetchTickets();
  }, []);

  async function handleToggleTicket(id, isResolved) {
    const { error } = await supabase
      .from("Tickets")
      .update({ is_resolved: !isResolved })
      .eq("id", id);

    if (error) {
      toast.error("Failed to update ticket!");
      return;
    }
    setTickets((prev) =>
      prev.map((t) => (t.id === id ? { ...t, is_resolved: !isResolved } : t)),
    );
    if (isResolved) toast.success("Ticket unresolved!");
    else toast.success("Ticket resolved!");
  }

  async function handleDeleteTicket(id) {
    const { error } = await supabase.from("Tickets").delete().eq("id", id);

    if (error) {
      toast.error("Failed to delete ticket!");
      return;
    }
    setTickets((prev) => prev.filter((t) => t.id !== id));
  }

  return (
    <Board
      tickets={tickets}
      onToggleTicket={handleToggleTicket}
      onDeleteTicket={handleDeleteTicket}
    />
  );
};

export default Home;
