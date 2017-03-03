package data;

import java.util.List;

import entities.FillUp;

public interface FuelDAOIntr {
	public List<FillUp> index();
	public FillUp show(int id);
	public FillUp create(FillUp fillUp);
	public FillUp update(int id, FillUp fillUp);
	public boolean destroy(int id);
}
