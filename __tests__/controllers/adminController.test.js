const AdminController = require('../../src/controllers/adminController');
const path = require('path');
const express = require('express');
const { Request, Response } = express;

describe('AdminController', () => {
  let adminController;
  let req;
  let res;
  let sendFileMock;

  beforeEach(() => {
    adminController = AdminController;

    req = {};
    sendFileMock = jest.fn();

    res = {
      status: jest.fn(() => res),
      sendFile: sendFileMock
    };
  });

  it('should send index.html', () => {
    adminController.index(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(sendFileMock).toHaveBeenCalledWith(path.join(__dirname, '../../public/index.html'));
  });

  it('should send createStore.html', () => {
    adminController.createStore(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(sendFileMock).toHaveBeenCalledWith(path.join(__dirname, '../../public/createStore.html'));
  });

  it('should send storeDetails.html', () => {
    adminController.storeDetails(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(sendFileMock).toHaveBeenCalledWith(path.join(__dirname, '../../public/storeDetails.html'));
  });

  it('should send allOrders.html', () => {
    adminController.allOrders(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(sendFileMock).toHaveBeenCalledWith(path.join(__dirname, '../../public/allOrders.html'));
  });

  it('should send placeOrder.html', () => {
    adminController.placeOrder(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(sendFileMock).toHaveBeenCalledWith(path.join(__dirname, '../../public/placeOrder.html'));
  });

  it('should send login.html', () => {
    adminController.login(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(sendFileMock).toHaveBeenCalledWith(path.join(__dirname, '../../public/login.html'));
  });

  it('should send getSettings.html', () => {
    adminController.getSettings(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(sendFileMock).toHaveBeenCalledWith(path.join(__dirname, '../../public/getSettings.html'));
  });

  it('should send setSettings.html', () => {
    adminController.setSettings(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(sendFileMock).toHaveBeenCalledWith(path.join(__dirname, '../../public/setSettings.html'));
  });

  it('should send setAddress.html', () => {
    adminController.setAddress(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(sendFileMock).toHaveBeenCalledWith(path.join(__dirname, '../../public/setAddress.html'));
  });

  it('should send tokenData.html', () => {
    adminController.tokenData(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(sendFileMock).toHaveBeenCalledWith(path.join(__dirname, '../../public/tokenData.html'));
  });

});