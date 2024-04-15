import { PodcastsApiClient } from "./PodcastsApiClient";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const mockPodcastsResponseApi = {
  contents: `{
      "feed": {
        "author": {
          "name": {"label": "iTunes Store"},
          "uri": {"label": "http://www.apple.com/itunes/"}
        },
        "entry": [
          {              
            "id": {"label": "https://podcasts.apple.com/us/podcast/the-joe-budden-podcast/id1535809341?uo=2", "attributes": {"im:id": "1535809341"}},
            "im:name": {"label": "The Joe Budden Podcast"},
            "im:image": [    
              {"label": "https://is1-ssl.mzstatic.com/image/thumb/Podcasts113/v4/f2/21/fa/f221fabd-017f-5125-633b-f1fe4f39802a/mza_182995249085044287.jpg/170x170bb.png", "attributes": {"height": "170"}}
            ],
            "summary": {"label": "Tune into Joe Budden and his friends. Follow along the crazy adventures of these very random friends."},                                          
            "title": {"label": "The Joe Budden Podcast - The Joe Budden Network"},
            "link": {"attributes": {"rel": "alternate", "type": "text/html", "href": "https://podcasts.apple.com/us/podcast/the-joe-budden-podcast/id1535809341?uo=2"}},
            "im:artist": {"label": "The Joe Budden Network", "attributes": {"href": "https://podcasts.apple.com/us/artist/the-joe-budden-network/1535844019?uo=2"}},
            "category": {"attributes": {"im:id": "1310", "term": "Music", "scheme": "https://podcasts.apple.com/us/genre/podcasts-music/id1310?uo=2", "label": "Music"}}
          }
        ]
      }
    }`,
};

const mockPodcastId = "123456";

//Actually the result has an formart similar to mockPodcastsResponseApi but to avoid problems i uses JSON.strinfy en the response mocked
const mockPodcastDetailsResponseApi = {
  resultCount: 21,
  results: [
    {
      kind: "podcast",
      trackCount: 476,
    },
    {
      kind: "podcast-episode",
      trackId: 1000652324873,
      trackName: 'Episode 716 | "Room 1108"',
      releaseDate: "2024-04-13T07:00:00Z",
      //artistIds: [1535844019],
      trackTimeMillis: 11145000,
      description:
        "In the latest episode, the JBP starts with their thoughts on Future & Metro Boomin’s ‘WE STILL DON’T TRUST YOU’ (17:50) before turning to reactions to A$AP Rocky and The Weeknd’s lyrics on the album (41:58). Chris Brown drops the deluxe for ‘11:11’ (1:04:20), Quavo counters to getting dissed with a record of his own (1:17:24), and Rappers have already started to respond to J. Cole following his apology (1:27:48). Also, the room sends their thoughts out following the passing of legendary DJ Mister Cee (1:32:35), O.J. Simpson dies at 76 after a battle with cancer (1:35:13), Jeezy files for primary custody of his daughter (2:18:03), and much more! \n Become a Patron of The Joe Budden Podcast for additional bonus episodes and visual content for all things JBP! Join our Patreon here: www.patreon.com/joebudden\n Sleeper Picks: \n Joe | Chris Brown (feat. Mario) - “Won’t Keep You Waiting”\n Ice | Real Sikh - “Sikh's Minute Drill”\n Parks | The Co-Op (feat. Passport Gift, Parks, Rasheed Campbell, David Bars, & the Wednesday Nights) - “Hell On Earth”\n Ish | Amber Mark - “Comin’ Around Again”\n Melyssa | RIMON - “Downtown”",
      episodeUrl:
        "https://verifi.podscribe.com/rss/p/traffic.libsyn.com/secure/jbpod/Joe_Budden_Podcast_716.mp3?dest-id=2422538",
    },
  ],
};

describe("PodcastsApiClient", () => {
  let client: PodcastsApiClient;
  let mockAxios: MockAdapter;

  beforeEach(() => {
    client = new PodcastsApiClient();
    mockAxios = new MockAdapter(axios);
  });

  afterEach(() => {
    mockAxios.restore();
  });

  describe("fetchTopPodcasts test", () => {
    it("fetches topPodcasts successfully", async () => {
      mockAxios
        .onGet(client.getTopPodcastsUrl())
        .reply(200, mockPodcastsResponseApi);

      const responseExpected = await client.fetchTopPodcasts();

      //It checks calls to API
      expect(mockAxios.history.get.length).toBe(1);
      expect(mockAxios.history.get[0].url).toBe(client.getTopPodcastsUrl());

      expect(responseExpected).toEqual(
        JSON.parse(mockPodcastsResponseApi.contents).feed.entry
      );
    });

    it("should throw an error when fetching top podcasts fails", async () => {
      mockAxios
        .onGet(client.getTopPodcastsUrl())
        .reply(500, { error: "Internal Server Error" });

      const consoleErrorSpy = jest
        .spyOn(console, "error")
        .mockImplementation(() => "error");

      await expect(client.fetchTopPodcasts()).rejects.toThrowError(
        "Request failed with status code 500"
      );

      consoleErrorSpy.mockRestore();
    });
  });

  describe("fetchPodcastsDetails test", () => {
    it("fetches podcast details successfully", async () => {
      mockAxios.onGet(client.getPodcastsDetailsUrl(mockPodcastId)).reply(200, {
        contents: JSON.stringify(mockPodcastDetailsResponseApi, null, 2),
      });

      const responseExpected = await client.fetchPodcastDetail(mockPodcastId);

      //It checks calls to API
      expect(mockAxios.history.get.length).toBe(1);
      expect(mockAxios.history.get[0].url).toBe(
        client.getPodcastsDetailsUrl(mockPodcastId)
      );

      expect(responseExpected).toEqual(mockPodcastDetailsResponseApi.results);
    });

    it("should throw an error when fetch posdcastDetails fails", async () => {
      mockAxios
        .onGet(client.getPodcastsDetailsUrl(mockPodcastId))
        .reply(500, { error: "Internal Server Error" });

      const consoleErrorSpy = jest
        .spyOn(console, "error")
        .mockImplementation(() => "error");

      await expect(
        client.fetchPodcastDetail(mockPodcastId)
      ).rejects.toThrowError("Request failed with status code 500");

      consoleErrorSpy.mockRestore();
    });
  });
});
