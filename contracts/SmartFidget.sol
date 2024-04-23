// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract SmartFidget {
    address public immutable owner;
    uint256 public recordsCount;
    Record[] public records;

    struct Session {
        uint16 main; //0 is for ccw, 1 is for cw and 2 is for p
        uint16 avg;
        uint16 min;
        uint16 max;
        uint16 id;
        string duration;
        string startTime;
        string endTime;
        string[] tags;
        string comment;
    }

    struct Record {
        address writer;
        uint16 avg;
        uint16 min;
        uint16 max;
        uint16 main; //0 is for ccw, 1 is for cw and 2 is for p
        uint16 sessionCount;
        uint256 totDuration;
        string date;
    }

    event RecordAdded(uint256 recordId);
    event SessionAdded(string date, uint256 sessionId);

    mapping(string => Session[]) dayToSessions;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Unauthorized");
        _;
    }

    function addRecord(
        uint16 _avg,
        uint16 _min,
        uint16 _max,
        uint16 _main,
        uint16 _sessionCount,
        uint256 _totDuration,
        string memory _date
    ) public onlyOwner {
        Record storage newRecord = records.push(); // Create a new Record and get a reference to it.
        newRecord.writer = msg.sender;
        newRecord.avg = _avg;
        newRecord.min = _min;
        newRecord.max = _max;
        newRecord.main = _main;
        newRecord.sessionCount = _sessionCount;
        newRecord.totDuration = _totDuration;
        newRecord.date = _date;

        recordsCount++;
        emit RecordAdded(records.length - 1);
    }

    function addSession(
        uint16 _main,
        uint16 _avg,
        uint16 _min,
        uint16 _max,
        uint16 _id,
        string memory _duration,
        string memory _date,
        string memory _startTime,
        string memory _endTime,
        string[] memory _tags,
        string memory _comment
    ) public onlyOwner {
        Session memory newSession = Session({
            main: _main, //0 is for ccw, 1 is for cw and 2 is for p
            avg: _avg,
            min: _min,
            max: _max,
            id: _id,
            duration: _duration,
            startTime: _startTime,
            endTime: _endTime,
            tags: _tags,
            comment: _comment
        });
        dayToSessions[_date].push(newSession);
        emit SessionAdded(_date, _id);
    }

    function getRecordsCount() public view onlyOwner returns (uint256) {
        return records.length;
    }

    function getRecord(uint256 recordId) public view onlyOwner returns (
        address writer,
        uint16 avg,
        uint16 min,
        uint16 max,
        uint16 main,
        uint16 sessionCount,
        uint256 totDuration,
        string memory date
    ) {
        require(recordId < records.length, "Record does not exist.");
        Record storage record = records[recordId];
        return (
            record.writer,
            record.avg,
            record.min,
            record.max,
            record.main,
            record.sessionCount,
            record.totDuration,
            record.date
        );
    }

    function getSession(uint16 _id, string memory _date) public view onlyOwner returns (
        uint16 main,
        uint16 avg,
        uint16 min,
        uint16 max,
        uint16 id,
        string memory duration,
        string memory startTime,
        string memory endTime,
        string[] memory tags,
        string memory comment
    ) {
        require(_id < dayToSessions[_date].length, "Session does not exist.");
        Session storage session = dayToSessions[_date][_id];
        return (
            session.main,
            session.avg,
            session.min,
            session.max,
            session.id,
            session.duration,
            session.startTime,
            session.endTime,
            session.tags,
            session.comment
        );
    }
}