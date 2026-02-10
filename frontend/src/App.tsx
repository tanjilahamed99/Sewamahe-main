import AppProviders from "./providers/AppProviders";
import { AppRoutes } from "./Routes/AppRoutes";

const App = () => (
    <AppProviders>
        <AppRoutes />
    </AppProviders>
);

export default App;
