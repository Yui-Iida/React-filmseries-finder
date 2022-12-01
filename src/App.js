import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Container } from "@material-ui/core";
import "./App.css";
import Header from "./components/Header/Header";
import MainNav from "./components/MainNav";
import Trending from "./Pages/Trending/Trending";
import Films from "./Pages/Films/Films";
import Series from "./Pages/Series/Series";
import Search from "./Pages/Search/Search";
import { createTheme, ThemeProvider } from "@mui/material";
import ThemeOptions from "./ThemeOptions";

function App() {
  const theme = createTheme(ThemeOptions);

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Header />
        <div className="app">
          <Container>
            <Routes>
              <Route path="/" element={<Trending />} exact theme={theme} />
              <Route path="/films" element={<Films />} theme={theme} />
              <Route path="/series" element={<Series />} theme={theme} />
              <Route path="/search" element={<Search />} theme={theme} />
            </Routes>
          </Container>
        </div>

        <MainNav />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
