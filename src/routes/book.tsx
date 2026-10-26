import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { createBooking } from "@/lib/booking.functions";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/book")({
  component: BookingPage,
});

function BookingPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    time: "",
    service: "General Consultation",
    notes: ""
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const bookFn = useServerFn(createBooking);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      await bookFn({ data: formData });
      setStatus("success");
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <main className="section max-w-xl mx-auto py-20 px-4 text-center">
        <h1 className="text-3xl font-bold mb-4 text-[#0a1128]">Booking Confirmed!</h1>
        <p className="text-gray-600 mb-8">Check your email for the calendar invite and details.</p>
        <Button onClick={() => window.location.href = "/"} className="btn btn-primary">Return to Home</Button>
      </main>
    );
  }

  return (
    <main className="section max-w-xl mx-auto py-20 px-4">
      <h1 className="text-3xl font-bold mb-2">Book a Free Consultation</h1>
      <p className="text-gray-500 mb-8">Let's discuss how we can manage your infrastructure.</p>
      
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input required type="text" className="w-full border p-2 rounded focus:ring-2 focus:ring-[#c9763d] outline-none" onChange={e => setFormData({...formData, name: e.target.value})} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input required type="email" className="w-full border p-2 rounded focus:ring-2 focus:ring-[#c9763d] outline-none" onChange={e => setFormData({...formData, email: e.target.value})} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Date</label>
            <input required type="date" className="w-full border p-2 rounded focus:ring-2 focus:ring-[#c9763d] outline-none" onChange={e => setFormData({...formData, date: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Time</label>
            <input required type="time" className="w-full border p-2 rounded focus:ring-2 focus:ring-[#c9763d] outline-none" onChange={e => setFormData({...formData, time: e.target.value})} />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Service Interest</label>
          <select className="w-full border p-2 rounded focus:ring-2 focus:ring-[#c9763d] outline-none" onChange={e => setFormData({...formData, service: e.target.value})}>
            <option>General Consultation</option>
            <option>Managed Hosting</option>
            <option>Custom Build</option>
            <option>Enterprise SLA</option>
          </select>
        </div>
        <Button type="submit" className="w-full btn btn-primary" disabled={status === "loading"}>
          {status === "loading" ? "Booking..." : "Confirm Booking"}
        </Button>
        {status === "error" && <p className="text-red-500 text-sm">Something went wrong. Please try again or check server logs.</p>}
      </form>
    </main>
  );
}