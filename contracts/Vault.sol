pragma solidity 0.4.24;

import "openzeppelin-solidity/contracts/math/SafeMath.sol";
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";


// Adapted from Open Zeppelin's RefundVault

contract Vault is Ownable {
    using SafeMath for uint256;

    mapping (address => uint256) public deposited;

    event LogDeposited(address indexed _user, uint256 amount);
    event LogWithdrawn(address indexed _user, uint256 amount);

    function deposit(address _user) onlyOwner external payable {
        deposited[_user] = deposited[_user].add(msg.value);
        emit LogDeposited(_user, msg.value);
    }

    function withdraw() external {
        address user = msg.sender;
        require(deposited[user] > 0, "Withdraw not allowed if sender deposit is 0.");
        uint256 withDrawAmount = deposited[user];
        deposited[user] = 0;
        user.transfer(withDrawAmount);
        emit LogWithdrawn(user, withDrawAmount);
    }

}
