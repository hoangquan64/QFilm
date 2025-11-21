import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import CategoryProvider from './contexts/CategoryProvider.jsx'
import CountryProvider from './contexts/CountryProvider.jsx'
import Movie_typeProvider from './contexts/Movie_typeProvider.jsx'
import AuthorProvider from './contexts/AuthorProvider.jsx'
import ActorProvider from './contexts/ActorProvider.jsx'
import ChacracterProvider from './contexts/ChacracterProvider.jsx'
import SectionProvider from './contexts/SectionProvider.jsx'
import MovieProvider from './contexts/MovieProvider.jsx'
import PlanProvider from './contexts/PlanProvider.jsx'
import FeatureProvider from './contexts/FeatureProvider.jsx'
import EpisodeProvider from './contexts/EpisodeProvider.jsx'
import PackageProvider from './contexts/PackageProvider.jsx'
import AccountProvider from './contexts/AccountProvider.jsx'
import AuthProvider, { AuthContext } from './contexts/AuthProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <CategoryProvider>
        <CountryProvider>
          <Movie_typeProvider>
            <AuthorProvider>
              <ActorProvider>
                <ChacracterProvider>
                  <MovieProvider>
                    <SectionProvider>
                      <PlanProvider>
                       <FeatureProvider> 
                        <EpisodeProvider>
                          <PackageProvider>
                            <AccountProvider>
                              <AuthProvider>
                                  <App />
                              </AuthProvider>
                            </AccountProvider>                     
                          </PackageProvider>
                        </EpisodeProvider>                      
                        </FeatureProvider>                      
                      </PlanProvider>
                    </SectionProvider>
                  </MovieProvider>
                </ChacracterProvider>
              </ActorProvider>
            </AuthorProvider>
          </Movie_typeProvider>
        </CountryProvider>
      </CategoryProvider>
    </BrowserRouter>
  </StrictMode>,
)
