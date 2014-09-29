/**
 * Crafted by Obero on 29/09/14
 * For Epitech Innovation Hub
 */

"use strict";
var galil = require('./gpio-galileo-helper');

var Mq3Controller = function()
{
    this.pin = 'A0';

    this.initial_state = 0;
};

Mq3Controller.prototype.getValue = function()
{
    var value;

    galil.openPin(this.pin);
    galil.setPinDirection(this.pin, 'out');
    galil.writePin(this.pin, '0');
    value = parseInt(galil.readAnalogPin(this.pin));
    galil.closePin(this.pin);

    return value;
};

Mq3Controller.prototype.getAverageValue = function(interval, count, callback)
{
    var that = this;
    var average_value = 0;

    galil.closePin(this.pin);
    galil.openPin(this.pin);
    galil.setPinDirection(this.pin, 'out');
    galil.writePin(this.pin, '0');

    console.log('[MQ3] Starting measurement');
    var timer = 0;
    var int_id = setInterval(function()
    {
        timer++;
        average_value += parseInt(galil.readAnalogPin(that.pin));
        if (timer > count)
        {
            galil.closePin(that.pin);
            clearInterval(int_id);
            average_value = average_value / count;
            console.log('[MQ3] Measurement done');
            callback(average_value);
        }
        console.log('[MQ3] ' + (count - timer) + ' left...');
    }, interval);
};

Mq3Controller.prototype.getHigherValue = function(interval, count, callback)
{
    var that = this;
    var higher_value = 0;

    galil.closePin(this.pin);
    galil.openPin(this.pin);
    galil.setPinDirection(this.pin, 'out');
    galil.writePin(this.pin, '0');

    console.log('[MQ3] Starting measurement');
    var timer = 0;
    var int_id = setInterval(function()
    {
        var current_value = parseInt(galil.readAnalogPin(that.pin));
        higher_value = (higher_value > current_value) ? higher_value : current_value;

        timer++;
        if (timer > count)
        {
            galil.closePin(that.pin);
            clearInterval(int_id);
            console.log('[MQ3] Measurement done');
            callback(higher_value);
        }
        console.log('[MQ3] ' + (count - timer) + ' left...');
    }, interval);
};

module.exports = new Mq3Controller;