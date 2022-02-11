pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract AngelAndDemonToken is ERC721, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;
	//uint256 MAX_TOKENS=10000;
	uint256 FEE=2500000000000000;
	address public constant devAddress = 0xc5A2fC2A14D72a5d55B3972b8963a048629eA8d0;
	string[] tokenuris;

    constructor() ERC721("AngelandDemons", "AND") {
		
	}

    function safeMint(string memory tokenURI_) public payable {
		//require(isSaleActive, "Sale is currently not active");
		//require(MAX_TOKENS > _tokenIdCounter.current() + 1, "Not enough tokens left to buy.");
		//require(msg.value >= FEE , "Amount of ether sent not correct.");
		
		_safeMint(msg.sender, _tokenIdCounter.current());
		_setTokenURI(_tokenIdCounter.current(), tokenURI_);
		_tokenIdCounter.increment();
	}
	
	function safeMintTo(address _to, string memory tokenURI_) public payable returns(uint) {
		//require(isSaleActive, "Sale is currently not active");
		//require(MAX_TOKENS > _tokenIdCounter.current() + 1, "Not enough tokens left to buy.");
		//require(msg.value >= FEE, "Value below price");
		uint current = _tokenIdCounter.current();

		_safeMint(_to, _tokenIdCounter.current());
		_setTokenURI(_tokenIdCounter.current(), tokenURI_);
		_tokenIdCounter.increment();

		return current;
	}
	
	function safeMintBulk(string[] memory tokenURI_, uint Noftokens) public payable {
		//require(isSaleActive, "Sale is currently not active");
		//require(MAX_TOKENS > _tokenIdCounter.current() + 1, "Not enough tokens left to buy.");
		require(Noftokens < 250,'Too high number'); //let's try a limit of 250
		
		for (uint i = 0; i < Noftokens; i ++) {
			safeMint(tokenURI_[i]);
		}
	}
	
	function safeMintBulkTo(string memory tokenURI_, uint Noftokens, address to_) public payable {
		//require(isSaleActive, "Sale is currently not active");
		//require(MAX_TOKENS > _tokenIdCounter.current() + 1, "Not enough tokens left to buy.");
		require(Noftokens < 250,'Too high number'); //let's try a limit of 250
		
		for (uint i = 0; i < Noftokens; i ++) {
			safeMintTo(to_,tokenURI_);
		}
	}
	
	function safeMintBulkRandomTo4(uint Noftokens, address to_, string memory uri1, string memory uri2, string memory uri3, string memory uri4) public payable {
		//require(isSaleActive, "Sale is currently not active");
		//require(MAX_TOKENS > _tokenIdCounter.current() + 1, "Not enough tokens left to buy.");
		//require (Noftokens < 250,'Too high number'); //let's try a limit of 250
						
		safeMintTo(to_,uri1);
		safeMintTo(to_,uri2);
		safeMintTo(to_,uri3);
		safeMintTo(to_,uri4);
	}
	
	function safeMintBulkRandomTo8(uint Noftokens, address to_, string memory uri1, string memory uri2, string memory uri3, string memory uri4,string memory uri5, string memory uri6, string memory uri7, string memory uri8) public payable {
		//require(isSaleActive, "Sale is currently not active");
		//require(MAX_TOKENS > _tokenIdCounter.current() + 1, "Not enough tokens left to buy.");
		//require (Noftokens < 250,'Too high number'); //let's try a limit of 250
						
		safeMintTo(to_,uri1);
		safeMintTo(to_,uri2);
		safeMintTo(to_,uri3);
		safeMintTo(to_,uri4);
		safeMintTo(to_,uri5);
		safeMintTo(to_,uri6);
		safeMintTo(to_,uri7);
		safeMintTo(to_,uri8);
	}
	

    // The following functions are overrides required by Solidity.

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }
	
	function burn(uint256 tokenId) public onlyOwner{
        _burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }
	
	//Return current counter value
	function getCounter()
        public
        view
        returns (uint256)
    {
        return _tokenIdCounter.current();
    }
	
	function withdrawAll() public {
        uint256 balance = address(this).balance;
        require(balance > 0);
        _widthdraw(devAddress, balance);
    }
	
	function _widthdraw(address _address, uint256 _amount) private {
        (bool success, ) = _address.call{value: _amount}("");
        require(success, "Transfer failed.");
    }
	
	// function setTokenURI(uint256 tokenId, string memory _tokenURI) public {
    //     require(
    //         _isApprovedOrOwner(_msgSender(), tokenId),
    //         "ERC721: transfer caller is not owner nor approved"
    //     );
    //     _setTokenURI(tokenId, _tokenURI);
    // }
}