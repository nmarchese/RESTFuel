package controllers;

import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;

import data.FuelDAO;
import data.FuelDAOIntr;
import entities.FillUp;

@RestController
@RequestMapping(path="fillUps")
public class FuelController implements FuelCtrlIntr {
	@Autowired
	private FuelDAOIntr fuelDAO;
	
	public void setFuelDAO(FuelDAO fuelDAO) {
		this.fuelDAO = fuelDAO;
	}
	
	@RequestMapping(path="/ping", method=RequestMethod.GET)
	public String ping() {
		return "pong";
	}
	
	@RequestMapping(path="", method=RequestMethod.GET)
	public List<FillUp> index() {
		return fuelDAO.index();
	}

	@RequestMapping(path="/{id}", method=RequestMethod.GET)
	public FillUp show(@PathVariable int id) {
		return fuelDAO.show(id);
	}

	@RequestMapping(path="", method=RequestMethod.POST)
	public FillUp create(@RequestBody String fillUpJSON, HttpServletResponse res) {
		ObjectMapper mapper = new ObjectMapper();
		FillUp fillUp = null;
		try {
			fillUp = mapper.readValue(fillUpJSON, FillUp.class);
			res.setStatus(201);
		} catch (Exception e) {
			e.printStackTrace();
			res.setStatus(418);
		}
		return fuelDAO.create(fillUp);
	}

	@RequestMapping(path="/{id}", method=RequestMethod.PUT)
	public FillUp update(@PathVariable int id, @RequestBody String fillUpJSON, HttpServletResponse res) {
		ObjectMapper mapper = new ObjectMapper();
		FillUp updatedFillUp = null;
		try {
			updatedFillUp = mapper.readValue(fillUpJSON, FillUp.class);
			res.setStatus(202);
		} catch (Exception e) {
			e.printStackTrace();
			res.setStatus(418);
		}
		return fuelDAO.update(id, updatedFillUp);
	}

	@RequestMapping(path="/{id}", method=RequestMethod.DELETE)
	public boolean destroy(@PathVariable int id) {
		return fuelDAO.destroy(id);
	}

}
