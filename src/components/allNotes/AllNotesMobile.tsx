import "./_AllNotes.scss";
import { useMode } from "../../context/ModeContext.tsx";
import localforage from "localforage";
import { useState, useEffect } from "react";

localforage.setItem("notes", [
  {
    id: "1",
    heading: "React Performance Optimization",
    tags: ["Dev", "React"],
    lastEdited: "2024-10-29",
    text: "Key performance optimization techniques:\n\n1. Code Splitting\n- Use React.lazy() for route-based splitting\n- Implement dynamic imports for heavy components\n\n2. Memoization\n- useMemo for expensive calculations\n- useCallback for function props\n- React.memo for component optimization\n\n3. Virtual List Implementation\n- Use react-window for long lists\n- Implement infinite scrolling\n\nTODO: Benchmark current application and identify bottlenecks",
  },
  {
    id: "2",
    heading: "Japan Travel Planning",
    tags: ["Travel", "Personal"],
    lastEdited: "2024-10-28",
    text: "Steps for planning my Japan trip:\n\n1. Destination List\n- Tokyo (Shinjuku, Akihabara, Harajuku)\n- Kyoto (Fushimi Inari, Kinkaku-ji)\n- Osaka (Dotonbori, Universal Studios Japan)\n\n2. Budgeting & Accommodation\n- Set daily budget for food, transport, and activities\n- Compare hotels vs Airbnb for cost-effectiveness\n\n3. Transportation\n- Get a Japan Rail Pass for long-distance travel\n- Plan subway routes for city navigation\n\nTODO: Finalize itinerary and book accommodations",
  },
  {
    id: "3",
    heading: "Favorite Pasta Recipes",
    tags: ["Cooking", "Recipes"],
    lastEdited: "2024-10-27",
    text: "My go-to pasta recipes for quick and delicious meals:\n\n1. Classic Carbonara\n- Ingredients: eggs, parmesan, pancetta, black pepper\n- Key technique: mix eggs and cheese off heat to avoid scrambling\n\n2. Pesto Pasta\n- Blend fresh basil, garlic, pine nuts, and olive oil\n- Toss with cooked pasta and cherry tomatoes\n\n3. Spicy Arrabbiata\n- Use crushed tomatoes, garlic, and red chili flakes\n- Simmer sauce for 15 minutes for rich flavor\n\nTODO: Try homemade pasta-making techniques",
  },
  {
    id: "4",
    heading: "Weekly Workout Plan",
    tags: ["Dev", "React"],
    lastEdited: "2024-10-25",
    text: "A structured weekly workout plan for strength and endurance:\n\n1. Strength Training\n- Monday: Upper body (bench press, rows, curls)\n- Wednesday: Lower body (squats, lunges, deadlifts)\n- Friday: Core & functional exercises\n\n2. Cardio & Mobility\n- Tuesday: HIIT session (sprints, burpees, jump squats)\n- Thursday: 5k run with progressive pace\n- Sunday: Yoga & stretching for recovery\n\nTODO: Track progress and adjust intensity as needed",
  },
  {
    id: "5",
    heading: "Meal Prep Ideas",
    tags: ["Cooking", "Health"],
    lastEdited: "2024-10-12",
    text: "Healthy and efficient meal prep for the week:\n\n1. Breakfast Options\n- Overnight oats with fruits and nuts\n- Scrambled eggs with spinach and feta\n\n2. Lunch & Dinner Prep\n- Grilled chicken with quinoa and roasted veggies\n- Chickpea salad with lemon-tahini dressing\n\n3. Snack Planning\n- Greek yogurt with honey\n- Hummus with sliced cucumbers and carrots\n\nTODO: Experiment with new high-protein recipes",
  },
  {
    id: "6",
    heading: "Reading List",
    tags: ["Personal", "Dev"],
    lastEdited: "2024-10-05",
    text: "A curated list of books to read across different genres:\n\n1. Fiction\n- 'The Midnight Library' by Matt Haig\n- 'Project Hail Mary' by Andy Weir\n\n2. Non-Fiction\n- 'Atomic Habits' by James Clear (productivity)\n- 'Sapiens' by Yuval Noah Harari (history)\n\n3. Technical Books\n- 'You Don’t Know JS' series by Kyle Simpson\n- 'Refactoring UI' by Adam Wathan & Steve Schoger\n\nTODO: Set monthly reading goals and take notes",
  },
  {
    id: "7",
    heading: "Fitness Goals 2025",
    tags: ["Personal", "Health"],
    lastEdited: "2023-11-05",
    text: "Setting achievable fitness goals for 2025:\n\n1. Strength Targets\n- Squat: 2x body weight\n- Deadlift: 2.5x body weight\n- Bench press: 1.5x body weight\n\n2. Endurance Goals\n- Complete a half-marathon in under 2 hours\n- Improve cycling stamina for long rides\n\n3. Daily Habits\n- Track macros and maintain balanced nutrition\n- Aim for 8,000+ steps per day\n\nTODO: Create a detailed training schedule",
  },
]);

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const AllNotesMobile = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    localforage.getItem("notes").then((storedNotes) => {
      if (storedNotes) setNotes(storedNotes);
    });
  }, []);

  const { mode } = useMode();
  //   const color = getComputedStyle(document.documentElement).getPropertyValue(
  //     mode === "dark" ? "--Neutral400" : "--Neutral500"
  //   );
  // const useColor = mode === "dark" ? "#FFFFFF" : "#0E121B";

  return (
    <div className="allNotesMobile">
      {notes.map((note) => (
        <NoteCard key={note.id} note={note} />
      ))}
    </div>
  );
};

const NoteCard = ({ note }) => (
  <div className="note-card">
    <h2>{note.heading}</h2>
    <div>
      {note.tags.map((tag: string) => (
        <span key={tag}>{tag}</span>
      ))}
    </div>
    <p>{formatDate(note.lastEdited)}</p>
  </div>
);

export default AllNotesMobile;
