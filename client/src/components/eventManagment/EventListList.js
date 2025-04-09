import { useState , useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import { fetchEvents ,createEvent ,updateEvent , deleteSelectedEvents} from "../../apis/EventManagmentApi";
import EventModal from "../../models/EventModal";
import Pagination from "../../utility/Pagination";


const EventList = () => {
  const [events, setEvents] = useState([]);

  const [selectedEvents, setSelectedEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const toggleSelection = (id) => {
    setSelectedEvents((prev) =>
      prev.includes(id) ? prev.filter((eventId) => eventId !== id) : [...prev, id]
    );
  };

  const formatDateForInput = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toISOString().slice(0, 16);
  };

  useEffect(() => {
     _fetchEvents();
  },[currentPage, itemsPerPage])

     const _fetchEvents = async () => {

      try {
        const result = await fetchEvents({page : currentPage , limit : itemsPerPage});
        console.log(result?.data?.items , "fetchEvents")
        setEvents(result?.data?.items || [])
        setTotalPages(result?.data?.totalPages || 1);
      } catch (error) {
        console.log(error.message);

      }
       
     }

     const handleEventSubmit = async(eventData) => {
      console.log(eventData , "event data")
      if (eventData._id) {
       const result = await updateEvent(eventData);
       if(result?.status){
        //without calling api 
        setEvents(events.map((event) => (event._id === eventData._id ? eventData : event)));

       }
      } else {
        
       const result = await createEvent(eventData)
       console.log(result , "result<><><><>") 
       if(result?.status == "SUCCESS"){
        setEvents([...events, result?.data || {}]);

       }
      }
    };

    const _deleteSelectedEvents = async () => {
      try {
          const result = await deleteSelectedEvents({eventIds : selectedEvents})
          console.log(result , "result")
        setSelectedEvents([]);
        _fetchEvents();
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <> 
    <div className="p-6 max-w-6xl mx-auto">
      <header className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">My Event List</h2>
      </header>

      <div className="flex justify-between mb-4">
        
        <div className="flex gap-2">
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => {
            setSelectedTask(null);
            setIsModalOpen(true);
          }}>+ Add Event</button>
        <button
          className={`bg-red-500 text-white px-4 py-2 rounded ${selectedEvents.length === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
          disabled={selectedEvents.length === 0}
          onClick={_deleteSelectedEvents}
        >
          🗑 Delete Selected
        </button>
         </div>

         <div>
         {/* SortFilterButtons component */}
         </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 rounded-lg shadow-md">
          <thead className="bg-gray-100">
            <tr className="text-left text-gray-700">
              <th className="p-2"><input type="checkbox" /></th>
              <th className="p-2">Event ID</th>
              <th className="p-2">Name</th>
       
              <th className="p-2">Date</th>
              <th className="p-2">Status</th>

              <th className="p-2">Edit</th>
            </tr>
          </thead>
          <tbody>
            {
            events.length > 0 ? (
              events?.map((event , index) => (
                <tr key={event._id} className="border-t">
                  <td className="p-2">
                    <input type="checkbox" onChange={() => toggleSelection(event._id)} checked={selectedEvents.includes(event._id)} />
                  </td>
                  <td className="p-2">{currentPage * itemsPerPage - itemsPerPage + index+1 || event._id}</td>
                  <td className="p-2">{event.title}</td>
                 
                  <td className="p-2">{new Date(event.date).toLocaleString()}</td>
                  <td className="p-2">{event.status}</td>
  
                  <td className="p-2 text-center">
                    <button className="text-blue-500" onClick={() => {
              setSelectedTask(event);
              setIsModalOpen(true);
            }}>
                      <FaEdit />
                    </button>
                  </td>
                </tr>
              ))
            ): (
              <tr>
                <td colSpan="6" className="p-2 text-center">
                  No events found
                </td>
              </tr>
            )
            }
          </tbody>
        </table>
      </div>

      <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
            onLimitChange={(limit) => {
              setItemsPerPage(limit);
              setCurrentPage(1);
            }}
          />

    </div>


    {/* Event Modal (Create/Edit) */}
    <EventModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmitForm={handleEventSubmit} task={selectedTask} />
    </>
  );
};

export default EventList;
