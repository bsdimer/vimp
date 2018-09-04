pragma solidity ^0.4.15;


contract VimpRegistry {

    address owner;

    modifier onlyowner () {
        if (owner == msg.sender) {
            _;
        }
        else {
            revert();
        }
    }

    function VimpRegistry() public {
        owner = msg.sender;
    }

    // (the client address => (the hash of the insurance => insurance contract))
    mapping (address => mapping (bytes32 => InsuranceContract)) transactions;
    // (address of the issuer => the name of the issuer)
    mapping (address => string) issuers;

    // Event fired when the insurance is published by the issuer
    event StartInsuranceContract(address, address, bytes32);
    // Event fired when the client pay for the insurance
    event InsuranceContractPayment(address, bytes32, uint256);


    struct InsuranceContract {
    address issuer; // insurance company
    address client; // end customer which will recive the insurance
    uint256 value2Pay; // the value that the client must pay
    bool paid; // insurance paid
    }

    /**
     * Add insurance company by address and name
     **/
    function addIssuer(string name) public {
        issuers[msg.sender] = name;
    }


    /**
     * Used from insurance companies
     **/
    function createInsurance(bytes32 hash, address client, uint256 value2Pay) public returns (bool) {
        if (bytes(issuers[msg.sender]).length > 0) {
            transactions[client][hash] = InsuranceContract(msg.sender, client, value2Pay, false);
            StartInsuranceContract(msg.sender, client, hash);
        }
        else {
            return false;
        }
        return true;
    }


    /**
     * End customer pays the insurance by specifing the hash of the document
     **/
    function payInsurance(bytes32 hash) public payable returns (bool) {
        InsuranceContract memory insuranceContract = transactions[msg.sender][hash];
        // Check weather the value sent is suffictient
        if ((msg.value + tx.gasprice) >= insuranceContract.value2Pay) {
            if (insuranceContract.paid == false) {
                insuranceContract.issuer.transfer(msg.value - tx.gasprice);
                transactions[msg.sender][hash].paid = true;
                InsuranceContractPayment(msg.sender, hash, msg.value);
                return true;
            }
        }
        return false;
    }

    /**
     * Get the contract data by client address and insurance hash
     **/
    function getContract(address client, bytes32 hash) public constant returns (address, bool) {
        InsuranceContract memory insuranceContract = transactions[client][hash];
        return (insuranceContract.issuer, insuranceContract.paid);
    }

    function getIssuer(address issuer) public constant returns (string) {
        return issuers[issuer];
    }

    function whoAmI() public constant returns (string) {
        return issuers[msg.sender];
    }

}