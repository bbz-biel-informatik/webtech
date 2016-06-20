function Robot(robot) {}

// wenn der Roboter nichts mehr zu tun hat:
Robot.prototype.onIdle = function(ev) {
    var robot;
    robot = ev.robot;
    robot.ahead(150);
    robot.rotateCannon(360);
    robot.back(100);
    robot.rotateCannon(360);
    robot.turn(20);
};

// wenn wir in einen anderen Roboter gefahren sind
Robot.prototype.onRobotCollision = function(ev) {};

// wenn wir in eine Mauer gefahren sind
Robot.prototype.onWallCollision = function(ev) {};

// Anderer Roboter im Sichtfeld
Robot.prototype.onScannedRobot = function(ev) {
    var robot;
    robot = ev.robot;
    robot.fire(1);
};

// von anderem Roboter getroffen
Robot.prototype.onHitByBullet = function(ev) {
    var robot;
    robot = ev.robot;
    robot.turn(90 - ev.bulletBearing);
};
