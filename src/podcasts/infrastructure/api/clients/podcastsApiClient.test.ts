import { PodcastsApiClient } from "./PodcastsApiClient";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

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

  it("should fetch top podcasts successfully", async () => {
    const mockResponseApi = {
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

    mockAxios.onGet(client.getTopPodcastsUrl()).reply(200, mockResponseApi);

    const responseExpected = await client.fetchTopPodcasts();

    //It checks calls to API
    expect(mockAxios.history.get.length).toBe(1);
    expect(mockAxios.history.get[0].url).toBe(client.getTopPodcastsUrl());

    expect(responseExpected).toEqual(
      JSON.parse(mockResponseApi.contents).feed.entry
    );
  });

  it("should throw an error when fetching top podcasts fails", async () => {
    mockAxios
      .onGet(client.getTopPodcastsUrl())
      .reply(500, { error: "Internal Server Error" });

    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => "error");

    //It checks responseExpected
    await expect(client.fetchTopPodcasts()).rejects.toThrowError(
      "Request failed with status code 500"
    );

    consoleErrorSpy.mockRestore();
  });
});
