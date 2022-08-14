//SPDX-License-Identifier:MIT

pragma solidity ^0.8.3;

contract Twitter{

    uint public counter;

    struct User{
        address userAddres;
        string str;
    }
    mapping(uint => string) public tweetMapping;


    // We are creating array of array to store all the tweets. We aren't using the Mapping
    User[] public userArr;

    event TweetCreated( 
        address,
        uint,
        string
    );


    function createTweet(string memory _str) public {
        userArr.push(User(msg.sender,_str));
        tweetMapping[counter] = _str;
        emit TweetCreated(msg.sender,counter,_str);
        counter+=1;
    }  
}