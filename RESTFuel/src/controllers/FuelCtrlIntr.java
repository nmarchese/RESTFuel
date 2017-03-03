package controllers;

import java.util.List;

import javax.servlet.http.HttpServletResponse;

import entities.FillUp;

public interface FuelCtrlIntr {
	public String ping();
	public List<FillUp> index();
	public FillUp show(int id);
	public FillUp create(String fillUpJSON, HttpServletResponse res);
	public FillUp update(int id, String fillUpJSON, HttpServletResponse res);
	public boolean destroy(int id);
}
