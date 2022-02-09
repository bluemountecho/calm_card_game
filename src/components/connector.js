import $ from "jquery"

export const connect = async function(onConnected = null) {
    try {
        if (!window.ethereum) {
            alert("Get MetaMask!");
            return;
        }

        var res = await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: "0x61" }]
        });

        var accounts = await window.ethereum.request({
            method: "eth_accounts",
        });

        if (accounts.length > 0) {
            $('#signIn').html('Sign In<br/>(' + accounts[0].substring(0, 5) + '...' + accounts[0].substring(accounts[0].length - 4) + ')')

            if (onConnected != null) {
                onConnected(accounts[0])
            }
            return;
        }
    
        accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
        });

        $('#signIn').html('Sign In<br/>(' + accounts[0].substring(0, 5) + '...' + accounts[0].substring(accounts[0].length - 4) + ')')
        
        if (onConnected != null) {
            onConnected(accounts[0])
        }
    } catch (err) {
        $('#signIn').html('Sign In')
    }    
}

export const getPlayerName = function() {

}