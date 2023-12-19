import routes from "@/router";
import { useRoutes } from "react-router-dom";

function App() {
  const outlet = useRoutes(routes);
  return <>{outlet}</>;
}

export default App;
