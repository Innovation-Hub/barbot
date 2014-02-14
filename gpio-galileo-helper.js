/**
 * Crafted by Obero on 02/14/14
 * For Epitech Innovation Hub
 */

"use strict";
var fs = require("fs");

/**
 * GalileoGpio helps you to manipulate GPIO on Intel Galileo board.
 *
 * @class GalileoGpio
 * @constructor
 */
var GalileoGpio = function()
{
    /**
     * Helps you to work directly on a given IO pin with its number,
     * mapping its number to the matching GPIO id.
     *
     * @property sysFsPath
     * @property pin
     * @type {Object}
     */
    this.sysFsPath = "/sys/class/gpio";
    this.pin =
    {
        3: "18",
        4: "28",
        5: "17",
        7: "27",
        8: "26"
    };
};

GalileoGpio.prototype.openGPIO = function()
{
    //TODO: direct use of GPIO number
};

/**
 * Exports a GPIO to make it reachable on the system.
 *
 * @method openPin
 * @param {Number} pin_number Number of the pin on the Galileo board.
 * @param {Function} [callback] Callback...
 */
GalileoGpio.prototype.openPin = function(pin_number, callback)
{
    //TODO: use rough GPIO method once available
    if (callback && typeof callback === "function")
        fs.writeFile(this.sysFsPath + "/export", this.pin[pin_number], callback);
    else
        fs.writeFile(this.sysFsPath + "/export", this.pin[pin_number]);
};

/**
 * Set the direction of the pin.
 *
 * @method setPinDirection
 * @param {Number} pin_number Number of the pin on the Galileo board.
 * @param {String} direction Either `in` or `out`
 * @param {Function} [callback] Callback...
 */
GalileoGpio.prototype.setPinDirection = function(pin_number, direction, callback)
{
    //TODO: Do the callback !
    fs.writeFile(this.sysFsPath + "/gpio" + this.pin[pin_number] + "/direction", direction, callback);
};

/**
 * Set the configuration type of the pin
 *
 * @method setPinPortDrive
 * @param {Number} pin_number Number of the pin on the Galileo board.
 * @param {String} config_type Either `pullup`, `pulldown`, `strong`, `hiz`
 * @param {Function} [callback] Callback...
 */exports.GalileoGpio = GalileoGpio;
GalileoGpio.prototype.setPinPortDrive = function(pin_number, config_type, callback)
{
    //TODO: Do the callback !
    fs.writeFile(this.sysFsPath + "/gpio" + this.pin[pin_number] + "/drive", config_type, callback);
};

/**
 * Write data on the pin
 *
 * @method writePin
 * @param {Number} pin_number Number of the pin on the Galileo board.
 * @param {String} data What does the pin says ?
 * @param {Function} [callback] Callback...
 */
GalileoGpio.prototype.writePin = function(pin_number, data, callback)
{
    //TODO: Do the callback !
    fs.writeFile(this.sysFsPath + "/gpio" + this.pin[pin_number] + "/value", data, "utf8", callback);
};

/**
 * Close system access to the pin
 *
 * @method closePin
 * @param {Number} pin_number Number of the pin on the Galileo board.
 * @param {Function} [callback] Callback...
 */
GalileoGpio.prototype.closePin = function(pin_number, callback)
{
    if (callback && typeof callback === "function")
        fs.writeFile(this.sysFsPath + "/unexport", itsme.pin[pin_number], callback);
    else
        fs.writeFile(this.sysFsPath + "/unexport", itsme.pin[pin_number]);
};

/**
 * Helper : let you command some pump - Specific to BarBot project.
 *
 * @method drainIndex
 * @param {Number} pin_number Number of the pin on the Galileo board.
 * @param {Number} delay Time (ms) of pumping
 * @param {Function} [callback] Callback... Called after the delay.
 */
GalileoGpio.prototype.drainIndex = function(pin_number, delay, callback)
{
    var that = this;

    this.openPin(pin_number);
    this.setPinDirection(pin_number, "out");
    this.setPinPortDrive(pin_number, "strong");
    this.writePin(pin_number, "1");
    setTimeout(function()
    {
        that.writePin(pin_number, "0");
        callback();
    }, delay);
};

module.exports = GalileoGpio;
