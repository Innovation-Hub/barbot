/**
 * Crafted by Obero on 30/09/14
 * For Epitech Innovation Hub
 */

"use strict";
var galil = require('./gpio-galileo-helper');

/**
 * RgbledController helps you to manipulate an RGB led.
 *
 * @class Rgbledcontroller
 * @constructor
 */
var RgbledController = function()
{
    /**
     * Sets pin ids to match it with colors
     * @property pin
     * @type {{r: number, g: number, b: number}}
     * @default {'r' : 3, 'g' : 10, 'b' : 11}
     */
    this.pin =
    {
        'r' : 3,
        'g' : 10,
        'b' : 11
    };

    /**
     * @property current
     * @type {{r: number, g: number, b: number}}
     * @default {'r' : 0, 'g' : 0, 'b' : 0}
     */
    this.current =
    {
        'r' : 0,
        'g' : 0,
        'b' : 0
    };

    this.blink_interval = -1;
};

/**
 * Helper : Turns the rgb led totally off
 *
 * @method turnOff
 */
RgbledController.prototype.turnOff = function(force)
{
    console.log('[RGB] turning off');
    if (typeof(force) === true && this.blink_interval != -1)
    {
        clearInterval(this.blink_interval);
        this.blink_interval = -1;
    }
    for (var index in this.pin)
    {
        if (this.pin.hasOwnProperty(index))
        {
            var color = index.toString();
            galil.openPin(this.pin[color]);
            galil.setPinDirection(this.pin[color], "out");
            galil.setPinPortDrive(this.pin[color], "strong");
            galil.writePin(this.pin[color], "0");
            galil.closePin(this.pin[color]);
        }
    }
};

/**
 * Helper : Sets the r, g, and b values for the led
 *
 * @method setRgbValues
 * @param {Object} rgb Values are either 0 or 1
 */
// TODO: use pwm to set all sorts of colors, and modulate it smoother
RgbledController.prototype.setRgbValue = function(rgb, force)
{
    var that = this;

    if (force === true && this.blink_interval != -1)
    {
        clearInterval(this.blink_interval);
        this.blink_interval = -1;
    }
    console.log('[RGB] setting to ' + rgb['r'] + ', ' + rgb['g'] + ', ' + rgb['b']);
    for (var index in this.pin)
    {
        if (this.pin.hasOwnProperty(index))
        {
            galil.openPin(this.pin[index]);
            galil.setPinDirection(this.pin[index], "out");
            galil.setPinPortDrive(this.pin[index], "strong");
            if (rgb[index] == 1)
            {
                galil.writePin(this.pin[index], "1");
            }
            else
            {
                galil.writePin(this.pin[index], "0");
            }
            galil.closePin(that.pin[index]);
        }
    }
};

RgbledController.prototype.setRgbValueTimer = function(rgb, timer, force)
{
    var that = this;

    this.setRgbValue(rgb, force);
    setTimeout(function()
    {
        that.turnOff();
    }, timer);
};

RgbledController.prototype.blinkColor = function(rgb, interval, count)
{
    var that = this;
    var timer = 0;
    count = typeof count !== 'undefined' ? count : -1;

    this.blink_interval = setInterval(function()
    {
        if (timer % 2 == 0)
        {
            that.setRgbValue(rgb);
        }
        else
        {
            that.turnOff();
        }
        timer++;
        if (count != -1 && timer > count && that.blink_interval != -1)
        {
            that.turnOff(true);
        }
    }, interval);
};

module.exports = new RgbledController;