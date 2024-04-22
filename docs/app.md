# Technologies and Architecture used

## State management

This app manages application state using `redux-toolkit` to get data from requests in some parts of application (podcasts details and episode details).


## Routing

For routing, we use [`react-router-dom`] to manage ours rutes:
- "/" to podcast list
- "/podcasts/:podcast:id" to podcast details
- "/podcasts/:podccasts:id/espisode/:episodeId" to episode details

## @tanStack/react-query and tanstack/react-query-persist-client

- To do request via useQuery 
- To manage the cache and enable persistence with localstorage.

## Jest for the test

- see [Testing](docs/testing.md)

## Prettier and esLint using with visual studio code (VSC)

To manage the dependency rules for 'react' and 'typescript' as well as the code formatting

My confiuration for VSC is the following (ctrl + shi + p: Perference open user settings):

```
{
  "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[jsonc]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "git.confirmSync": false,
  "editor.renderWhitespace": "all",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact"
  ],
  "eslint.workingDirectories": ["src"]
}
```
The prettier rules is in the file configuration `.pretterrc`.
the esLint rules is in the file configuration `.eslintrc.yaml`

## Webpack

For the management and optimization of resources depending on the development environment (prod or dev)

You can see the file configuration to know more `wepack.config.js`

## Architecture: `hexagonal` and `vertical slicing`

According to `hexagonal` we use "infrastructure" , "application" and "domain" (application and domain inside from "core" folder)

- infrastructure to logic with external data. In this case our client with his adapter for each request to "ours endpoints" similar to "https://api.allorigins.win/get?url=URL_ITUNES"
- application to manage our uses cases (GetTopPodcats and GetPodcastDetail)
- domain to manage our entities and our interfaces to apiClient (ports)

Besides i have decided structure the react ecosystem inside the folder "adapters", understang it like logic or Lifecycle that exist bewteen the components and graphical interface that the user can see.
"primary" to graphical interface
"secondary" to manage react's own mechanisms such as global state, contexts, etc.

The uses cases will be calle via hook in the page where it needs data infrastructure.

According to `vertical slicing` i am using the directory `podcasts` with the idea the use his same infrastruture, if in the futre i need add `users`for example. 


According to the `hexagonal` architecture, we use "infrastructure," "application," and "domain" (with both application and domain inside the "core" folder):

- Infrastructure: For logic related to external data. In this case, our client uses an adapter for each request to our endpoints, similar to "https://api.allorigins.win/get?url=URL_ITUNES".
- Application: To manage our use cases (GetTopPodcasts and GetPodcastDetail).
- Domain: To manage our entities and our interfaces to the apiClient (ports).

Additionally, I have decided to structure the React ecosystem within the "adapters" folder, understanding it as the logic or lifecycle that exists between the components and the graphical interface that the user can see:

- "primary" for the graphical interface
- "secondary" to manage React's own mechanisms such as global state, contexts, etc.

The use cases will be called via a hook on the page where the data infrastructure is needed.

According to `vertical slicing`, I am using the directory podcasts with the idea of using the same infrastructure if, in the future, I need to add users, for example. I can create a directory called "users" with similar infrastrutre.

\PODCAST\SRC
|   AppRouter.tsx
|   index.css
|   index.tsx
|   react-app-env.d.ts
|   reportWebVitals.ts
|   setupTests.ts
|
\---podcasts
    +---adapters
    |   +---primary
    |   |   \---ui
    |   |       +---assets
    |   |       +---components
    |   |       |       Filter.module.css
    |   |       |       Filter.test.tsx
    |   |       |       Filter.tsx
    |   |       |       Header.module.css
    |   |       |       Header.test.tsx
    |   |       |       Header.tsx
    |   |       |       IconNumber.module.css
    |   |       |       IconNumber.test.tsx
    |   |       |       IconNumber.tsx
    |   |       |       Loader.module.css
    |   |       |       Loader.test.tsx
    |   |       |       Loader.tsx
    |   |       |       PodcasCard.module.css
    |   |       |       PodcastCard.test.tsx
    |   |       |       PodcastCard.tsx
    |   |       |       PodcastDetaillsLateral.tsx
    |   |       |       PodcastDetailsLateral.module.css
    |   |       |
    |   |       +---hooks
    |   |       |       usePodcastDetails.ts
    |   |       |       useTopPodcasts.ts
    |   |       |
    |   |       +---pages
    |   |       |       EpisodeDetails.module.css
    |   |       |       EpisodeDetails.tsx
    |   |       |       PodcastDetails.module.css
    |   |       |       PodcastDetails.tsx
    |   |       |       Podcasts.module.css
    |   |       |       Podcasts.tsx
    |   |       |
    |   |       \---utils
    |   |               utilsTimer.test.ts
    |   |               utilsTimer.ts
    |   |
    |   \---secondary
    |       +---context
    |       +---providers
    |       \---redux
    |               episodeDetailsSlice.ts
    |               podCastDetailsSlice.ts
    |               store.ts
    |
    +---config
    |   \---routes
    |           routes.ts
    |
    +---core
    |   +---application
    |   |   \---usesCases
    |   |           GetPodcastDetail.ts
    |   |           GetTopPodcasts.ts
    |   |
    |   \---domain
    |       +---entities
    |       |       episode.ts
    |       |       podcast.ts
    |       |       podcastDetails.ts
    |       |
    |       \---ports
    |               podcastsApiPort.ts
    |
    \---infrastructure
        \---api
            +---adapters
            |       PodcastAdpater.test.ts
            |       PodcastsAdapter.ts
            |
            +---clients
            |       podcastsApiClient.test.ts
            |       PodcastsApiClient.ts
            |
            \---mappers
                    podcastDetailReponseMapper.ts
                    podcastDetailResponseMapper.test.ts
                    podcastsResponseMapper.test.ts
                    podcastsResponseMapper.ts