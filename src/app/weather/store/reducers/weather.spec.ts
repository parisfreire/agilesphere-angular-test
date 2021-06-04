import { reducers, initialState } from "./weather";
import { SearchComplete, SearchError } from "../actions/weather";

describe("Reducers", () => {

  it("should use SearchComplete action and store payload", () => {

    const payload = { city : {id: 1, name: 'London'} };    
    const action = new SearchComplete(payload);

    const result = reducers(initialState, action);
    
    expect(result.weatherList[0]).toEqual(payload);
  });

  it("should use SearchError action and store payload when failing", () => {

    const payload = "Error";    
    const action = new SearchError(payload);

    const result = reducers(initialState, action);
    
    expect(result.error).toEqual(payload);
  });


})