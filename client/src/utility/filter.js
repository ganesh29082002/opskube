export const filterData = (users,searchQuery) =>{
    console.log(users , searchQuery)
   return  users?.filter(user => user?.firstName.toLowerCase().includes(searchQuery?.toLowerCase()));
}