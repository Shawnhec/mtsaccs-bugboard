import { supabase } from "../client";
import Form from "../components/Form";

const NewTicket = () => {
  async function handleCreateTicket(ticket) {
    const { error } = await supabase.from("Tickets").insert(ticket);
    if (error) throw error;
  }

  return <Form onCreateTicket={handleCreateTicket} />;
};

export default NewTicket;
