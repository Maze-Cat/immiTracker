import { parseVisaBulletin } from '@/lib/visa-bulletin/parser';

const SAMPLE_HTML = `
<html>
<head><title>Visa Bulletin for March 2026</title></head>
<body>
<h1>Visa Bulletin for March 2026</h1>

<h2>A. Employment-Based Final Action Dates</h2>
<table>
  <tr>
    <th>Category</th>
    <th>All Chargeability Areas</th>
    <th>China-mainland born</th>
    <th>India</th>
    <th>Mexico</th>
    <th>Philippines</th>
  </tr>
  <tr><td>1st</td><td>C</td><td>01JAN22</td><td>01FEB20</td><td>C</td><td>C</td></tr>
  <tr><td>2nd</td><td>01MAR22</td><td>08JUN19</td><td>01JAN13</td><td>01MAR22</td><td>01MAR22</td></tr>
  <tr><td>3rd</td><td>01SEP21</td><td>01JAN19</td><td>01JAN12</td><td>01SEP21</td><td>01SEP21</td></tr>
</table>

<h2>B. Dates for Filing Employment-Based</h2>
<table>
  <tr>
    <th>Category</th>
    <th>All Chargeability Areas</th>
    <th>China-mainland born</th>
    <th>India</th>
    <th>Mexico</th>
    <th>Philippines</th>
  </tr>
  <tr><td>1st</td><td>C</td><td>C</td><td>C</td><td>C</td><td>C</td></tr>
  <tr><td>2nd</td><td>C</td><td>01APR20</td><td>01JUL14</td><td>C</td><td>C</td></tr>
  <tr><td>3rd</td><td>01JAN22</td><td>01JUL19</td><td>01JUN13</td><td>01JAN22</td><td>01JAN22</td></tr>
</table>

<h2>C. Family-Based Final Action Dates</h2>
<table>
  <tr>
    <th>Category</th>
    <th>All Chargeability Areas</th>
    <th>China-mainland born</th>
    <th>India</th>
    <th>Mexico</th>
    <th>Philippines</th>
  </tr>
  <tr><td>F1</td><td>01JAN15</td><td>01JAN15</td><td>01JAN15</td><td>01APR00</td><td>01APR13</td></tr>
  <tr><td>F2A</td><td>C</td><td>C</td><td>C</td><td>C</td><td>C</td></tr>
</table>

<h2>D. Dates for Filing Family-Based</h2>
<table>
  <tr>
    <th>Category</th>
    <th>All Chargeability Areas</th>
    <th>China-mainland born</th>
    <th>India</th>
    <th>Mexico</th>
    <th>Philippines</th>
  </tr>
  <tr><td>F1</td><td>01AUG16</td><td>01AUG16</td><td>01AUG16</td><td>01MAR01</td><td>01JUL15</td></tr>
  <tr><td>F2A</td><td>C</td><td>C</td><td>C</td><td>C</td><td>C</td></tr>
</table>
</body>
</html>
`;

describe('parseVisaBulletin', () => {
  it('extracts bulletin month from title', () => {
    const result = parseVisaBulletin(SAMPLE_HTML);
    expect(result.bulletinMonth).toBe('March 2026');
    expect(result.bulletinYear).toBe(2026);
  });

  it('parses EB final action dates correctly', () => {
    const result = parseVisaBulletin(SAMPLE_HTML);
    const ebFinal = result.employmentBased.finalActionDates;

    expect(ebFinal['EB1']).toBeDefined();
    expect(ebFinal['EB2']).toBeDefined();
    expect(ebFinal['EB3']).toBeDefined();

    // EB1 All Chargeability = Current
    expect(ebFinal['EB1'].allChargeability).toBe('C');

    // EB2 India = 01JAN13 → 2013-01-01
    expect(ebFinal['EB2'].india).toBe('2013-01-01');

    // EB3 China = 01JAN19 → 2019-01-01
    expect(ebFinal['EB3'].china).toBe('2019-01-01');
  });

  it('parses EB dates for filing correctly', () => {
    const result = parseVisaBulletin(SAMPLE_HTML);
    const ebFiling = result.employmentBased.datesForFiling;

    expect(ebFiling['EB1'].allChargeability).toBe('C');
    expect(ebFiling['EB2'].india).toBe('2014-07-01');
    expect(ebFiling['EB3'].china).toBe('2019-07-01');
  });

  it('parses FB final action dates correctly', () => {
    const result = parseVisaBulletin(SAMPLE_HTML);
    const fbFinal = result.familyBased.finalActionDates;

    expect(fbFinal['F1']).toBeDefined();
    expect(fbFinal['F2A']).toBeDefined();
    expect(fbFinal['F2A'].allChargeability).toBe('C');
    expect(fbFinal['F1'].mexico).toBe('2000-04-01');
  });

  it('parses FB dates for filing correctly', () => {
    const result = parseVisaBulletin(SAMPLE_HTML);
    const fbFiling = result.familyBased.datesForFiling;

    expect(fbFiling['F1'].allChargeability).toBe('2016-08-01');
    expect(fbFiling['F2A'].india).toBe('C');
  });

  it('includes fetchedAt as ISO string', () => {
    const result = parseVisaBulletin(SAMPLE_HTML);
    expect(result.fetchedAt).toMatch(/^\d{4}-\d{2}-\d{2}T/);
  });

  it('throws on empty/malformed HTML with no tables', () => {
    expect(() => parseVisaBulletin('<html><body><p>Nothing here</p></body></html>')).toThrow(
      /no category data/,
    );
  });

  it('throws on HTML with tables but no classifiable headings', () => {
    const html = `<html><body>
      <h2>Some Random Heading</h2>
      <table><tr><td>foo</td><td>bar</td></tr></table>
    </body></html>`;
    expect(() => parseVisaBulletin(html)).toThrow(/no category data/);
  });

  it('handles "U" and "Unavailable" values', () => {
    const html = `<html>
      <title>Visa Bulletin for January 2025</title>
      <h2>Employment-Based Final Action Dates</h2>
      <table>
        <tr><th>Category</th><th>All Chargeability</th><th>China</th><th>India</th><th>Mexico</th><th>Philippines</th></tr>
        <tr><td>1st</td><td>U</td><td>Unavailable</td><td>C</td><td>Current</td><td>01MAR22</td></tr>
      </table>
    </html>`;
    const result = parseVisaBulletin(html);
    const eb = result.employmentBased.finalActionDates;
    expect(eb['EB1'].allChargeability).toBe('U');
    expect(eb['EB1'].china).toBe('U');
    expect(eb['EB1'].india).toBe('C');
    expect(eb['EB1'].mexico).toBe('C');
    expect(eb['EB1'].philippines).toBe('2022-03-01');
  });

  it('handles DD-MMM-YYYY date format', () => {
    const html = `<html>
      <title>Visa Bulletin for February 2025</title>
      <h2>Employment-Based Final Action Dates</h2>
      <table>
        <tr><th>Category</th><th>All Chargeability</th><th>China</th><th>India</th><th>Mexico</th><th>Philippines</th></tr>
        <tr><td>1st</td><td>01-JAN-2022</td><td>15-MAR-2021</td><td>C</td><td>C</td><td>C</td></tr>
      </table>
    </html>`;
    const result = parseVisaBulletin(html);
    expect(result.employmentBased.finalActionDates['EB1'].allChargeability).toBe('2022-01-01');
    expect(result.employmentBased.finalActionDates['EB1'].china).toBe('2021-03-15');
  });
});
