//SPDX-License-Identifier:MIT

pragma solidity ^0.8.3;

contract Twitter{

    uint public counter;

    struct User{
        address userAddres;
        string str;
    }
    mapping(uint => string) public tweetMapping;
    // mapping(uint => string) public tweetMapping;

    User[] public userArr;

    function createTweet(string memory _str) public {
        userArr.push(User(msg.sender,_str));
        tweetMapping[counter] = _str;
        counter+=1;
    }  
}