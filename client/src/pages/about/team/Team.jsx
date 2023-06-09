import TeamHeader from "./TeamHeader";
import TeamMembers from "./team-members/TeamMembers";

export default function Team() {
  return (
    <div className="flex flex-col gap-6 tablet:gap-10 z-10 pt-12 px-3 tablet:px-2">
      <TeamHeader/>
      <TeamMembers/>
    </div>
  );
}
