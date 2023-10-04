const AdminController = require('../../src/controllers/adminController');
const path = require('path');
const express = require('express');
const { Request, Response } = express;

describe('AdminController', () => {
  let adminController;

  beforeAll(() => {
    adminController = AdminController;
  });

  it('should send index.html', () => {
    const req = {};
    const res = {
      status: jest.fn(() => res),
      sendFile: jest.fn(),
    };;
    const sendFileMock = jest.fn();
    res.status = jest.fn(() => res);
    res.sendFile = sendFileMock;

    adminController.index(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(sendFileMock).toHaveBeenCalledWith(path.join(__dirname, '../../public/index.html'));
  });

  it('should send createStore.html', () => {
    const req = {};
    const res = {
      status: jest.fn(() => res),
      sendFile: jest.fn(),
    };;
    const sendFileMock = jest.fn();
    res.status = jest.fn(() => res);
    res.sendFile = sendFileMock;

    adminController.createStore(req, res); // Use createStore here

    expect(res.status).toHaveBeenCalledWith(200);
    expect(sendFileMock).toHaveBeenCalledWith(path.join(__dirname, '../../public/createStore.html'));
  });

  it('should send storeDetails.html', () => {
    const req = {};
    const res = {
      status: jest.fn(() => res),
      sendFile: jest.fn(),
    };
    const sendFileMock = jest.fn();
    res.status = jest.fn(() => res);
    res.sendFile = sendFileMock;

    adminController.storeDetails(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(sendFileMock).toHaveBeenCalledWith(path.join(__dirname, '../../public/storeDetails.html'));
  });


  // Repeat similar changes for other test cases
});
