import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import PrayerTimes from "@/pages/prayer-times"; // Prayer Times import
import DigitalTasbih from "@/pages/tasbih"; // Digital Tasbih import
import PrayerReminder from "@/pages/reminders"; // Prayer Reminder import

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/prayer-times" component={PrayerTimes} />
      <Route path="/tasbih" component={DigitalTasbih} />
      <Route path="/reminders" component={PrayerReminder} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;