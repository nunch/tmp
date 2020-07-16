/* eslint-env node, mocha */

const assert = require('assert');

const ColorThief = require('color-thief');
const imageSize = require('image-size');

const chartsLib = require('../../lib/charts');
const charts = require('./chart_helpers');
const { assertSimilarRgb } = require('./color_helpers');

const colorThief = new ColorThief();

describe('charts.js', () => {
  it('renders a JSON chart', async () => {
    const buf = await chartsLib.renderChartJs(200, 100, 'white', 1.0, charts.BASIC_CHART);

    assert(buf.length > 0);
    const dimensions = imageSize(buf);
    // Device pixel ratio is 2.0, so multiply dimensions by that.
    assert.equal(200, dimensions.width);
    assert.equal(100, dimensions.height);
  });

  it('adjusts chart size based on device pixel ratio', async () => {
    const buf = await chartsLib.renderChartJs(200, 100, 'white', 2.0, charts.BASIC_CHART);

    assert(buf.length > 0);
    const dimensions = imageSize(buf);
    // Device pixel ratio is 2.0, so multiply dimensions by that.
    assert.equal(200 * 2, dimensions.width);
    assert.equal(100 * 2, dimensions.height);
  });

  it('renders a JS chart', async () => {
    const buf = await chartsLib.renderChartJs(200, 100, 'white', 2.0, charts.JS_CHART);
    assert(buf.length > 0);
  });

  it('renders a chart color scheme', async () => {
    const buf = await chartsLib.renderChartJs(200, 100, 'white', 2.0, charts.CHART_COLOR_SCHEME);
    const rgb = colorThief.getColor(buf);
    assertSimilarRgb([156, 156, 252], rgb);
  });
});
