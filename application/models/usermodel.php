<?php
class usermodel extends CI_model{
	function getAll() {
		$this->db->select('*');
		$this->db->from('members');
		//$this->db->where('id', 1);
		
		$q = $this->db->get();
		
		if($q->num_rows() > 0) {
			foreach ($q->result() as $row) {
				$data[] = $row;
			}
			return $data;
		}		
		
	}
	
	//Get user by 'id'
	function getById($id){
		$this->db->select('*');
		$this->db->from('members');
		$this->db->where('id', $id);
		
		$q = $this -> db -> get();

		if ($q -> num_rows() > 0) {
			// foreach ($q->result() as $row) {
				// $data[] = $row;
			// }
			$data = $q -> row();
			return $data;
		}
		
	}
}


?>