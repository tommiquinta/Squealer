
import UsersCard from "./UsersCard";

export default function UsersList({profiles, add, hasFilters, byName, isModerator}){

  if(hasFilters){
    return(
      <div className={`grid items-baseline gap-x-4 items-center px-4 py-2 left-1/4 relative ${add}`}>
      {profiles?.filter( prof =>
        { //ritorna un boolean
          if(byName !=null && isModerator){
            return (prof.username.toLowerCase().includes(byName.toLowerCase()) || prof.name.toLowerCase().includes(byName.toLowerCase())) && isModerator === prof.is_moderator;
          }
          if(byName != null){
            return ( prof.username.toLowerCase().includes(byName.toLowerCase()) || prof.name.toLowerCase().includes(byName.toLowerCase()));
          }
          if(isModerator){
            return isModerator === prof.is_moderator;
          }
          return false;
        }
      ).map( prof => (
          <UsersCard key={prof.username} {...prof} />
        )
        )}
      </div>
    );
  }

    return( 
    <div className={`grid grid-cols-3 items-baseline gap-x-4 items-center px-4 py-2 relative ${add}`}>
      {profiles?.map( profile => (
          <UsersCard key={profile.username} {...profile} />
        ))}
    </div>
  );
}