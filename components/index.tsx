import axios from "axios";

export async function subgraphQuery(query : any) {
  try {
    const SUBGRAPH_URL = "https://api.thegraph.com/subgraphs/name/dinesh11515/stream"; //graph url change kerna hai
    const response = await axios.post(SUBGRAPH_URL, {
      query,
    });
    if (response.data.errors) {
      console.error(response.data.errors);
      throw new Error(`Error making subgraph query ${response.data.errors}`);
    }
    return response.data.data;
  } catch (error) {
    console.error(error);
  }
}

export function FETCH_FLEES_BY_RECEIVER(address: string) {
    return `query {
        flees(where: {receiver: "${address}"}) {
            id
            amount
            receiver
            sender
            startTime
            stopTime
            rate
            cancelled
            claimed
          }
      }`;
}

export function FETCH_FleeS_BY_SENDER(address: string) {
    return `query {
        flees(where: {sender: "${address}"}) {
            id
            amount
            receiver
            sender
            startTime
            stopTime
            rate
            cancelled
            claimed
          }
      }`;
}