


import { useState , useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import { fetchAllEvents , rsvpToEvent , fetchRegisterEvents} from "../../apis/EventManagmentApi";
import EventModal from "../../models/EventModal";
import Pagination from "../../utility/Pagination";



const RegisterEvent = () => {
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);


  const formatDateForInput = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toISOString().slice(0, 16);
  };

  useEffect(() => {
     _fetchRegisterEvents();
  },[currentPage, itemsPerPage])

     const _fetchRegisterEvents = async () => {

      try {
        const result = await fetchRegisterEvents({page : currentPage , limit : itemsPerPage});
        console.log(result?.data?.items , "fetchEvents")
        setEvents(result?.data?.items || [])
        setTotalPages(result?.data?.totalPages || 1);
      } catch (error) {
        console.log(error.message);

      }
       
     }



  return (
    <> 
    <div className="p-6 max-w-6xl mx-auto">
      <header className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">All Event List</h2>
      </header>

      <div className="flex justify-between mb-4">
    

         <div>
         {/* SortFilterButtons component */}
         </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 rounded-lg shadow-md">
          <thead className="bg-gray-100">
            <tr className="text-left text-gray-700">
             
              <th className="p-2">Event ID</th>
              <th className="p-2">Event Name</th>
       
              <th className="p-2">Date</th>
              <th className="p-2">Event Status</th>

              <th className="p-2">RSVP</th>
            </tr>
          </thead>
          <tbody>
            {
            events.length > 0 ? (
              events?.map((event , index) => (
                <tr key={event._id} className="border-t">
                  <td className="p-2">{currentPage * itemsPerPage - itemsPerPage + index+1 || event._id}</td>
                  <td className="p-2">{event.event.title}</td>
                 
                  <td className="p-2">{new Date(event.event.date).toLocaleString()}</td>
                  <td className="p-2">{event.event.status}</td>
  
                  <td className="p-2 text-center">
            
                      <button  className="text-blue-500  ">
                        Done
                      </button>
                   
                  </td>
                </tr>
              ))
            ) : (
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


       </>
  );
};

export default RegisterEvent;
