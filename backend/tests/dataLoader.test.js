// tests/dataLoader.test.js
import { expect } from 'chai';
import sinon from 'sinon';
import fs from 'fs/promises';
import path from 'path';
import { loadData } from '../src/services/dataLoaderService.js';

describe('loadData', () => {
  const __dirname = path.dirname(new URL(import.meta.url).pathname);
  const filePath = path.join(__dirname, 'data.json');

  let readFileStub;

  before(() => {
    readFileStub = sinon.stub(fs, 'readFile');
  });

  after(() => {
    readFileStub.restore();
  });

  it('should load and parse data from JSON file', async () => {
    const mockData = `
    [
        {
            "name": "Radiohead",
            "albums": [
                {
                    "title": "The King of Limbs",
                    "songs": [
                        {
                            "title": "Bloom",
                            "length": "5:15"
                        },
                        {
                            "title": "Morning Mr Magpie",
                            "length": "4:41"
                        },
                        {
                            "title": "Little by Little",
                            "length": "4:27"
                        },
                        {
                            "title": "Feral",
                            "length": "3:13"
                        },
                        {
                            "title": "Lotus Flower",
                            "length": "5:01"
                        },
                        {
                            "title": "Codex",
                            "length": "4:47"
                        },
                        {
                            "title": "Give Up the Ghost",
                            "length": "4:50"
                        },
                        {
                            "title": "Separator",
                            "length": "5:20"
                        }
                    ],
                    "description": "The King of Limbs is the eighth studio album by English rock band Radiohead."
                }
            ]
        }
    ]
    `;

    readFileStub.resolves(mockData);

    const data = await loadData(filePath);

    expect(data).to.be.an('array').that.is.not.empty;
    expect(data[0]).to.have.property('name', 'Radiohead');
    expect(data[0]).to.have.property('albums').that.is.an('array').that.is.not.empty;
  });

  it('should throw an error if the file cannot be read', async () => {
    readFileStub.rejects(new Error('File read error'));

    try {
      await loadData(filePath);
      expect.fail('Expected loadData to throw an error');
    } catch (err) {
      expect(err).to.be.an('error').with.property('message', 'File read error');
    }
  });
});
