import { Details } from "../details";

export interface PostsState{
    posts : Details[]
}
export const initialState : PostsState = {
    posts : [
      {
        "firstName": "ahdkad",
        "lastName": "pattoori",
        "email": "va@in",
        "mobile": "7890789009",
        "street": "1",
        "city": "aaa",
        "state": "lll",
        "pincode": "888888",
        "date": '4/18/2021, 10:34:19 PM',
        "id": 1
      }
      
      
    ]

}