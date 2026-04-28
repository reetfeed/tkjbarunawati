import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

// Pages
import Home from "@/pages/home";
import AnggotaList from "@/pages/anggota/index";
import AnggotaDetail from "@/pages/anggota/detail";
import Galeri from "@/pages/galeri/index";
import Kenangan from "@/pages/kenangan/index";
import Pesan from "@/pages/pesan/index";

const queryClient = new QueryClient();

function Router() {
  return (
    <div className="flex flex-col min-h-[100dvh] bg-background text-foreground dark selection:bg-primary selection:text-primary-foreground">
      <Navbar />
      <main className="flex-1">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/anggota" component={AnggotaList} />
          <Route path="/anggota/:id" component={AnggotaDetail} />
          <Route path="/galeri" component={Galeri} />
          <Route path="/kenangan" component={Kenangan} />
          <Route path="/pesan" component={Pesan} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
