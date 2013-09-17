<?php
class users extends CI_Controller {
	function index() {
		$this -> load -> model('usermodel');
		$data['users'] = $this -> usermodel -> getAll();
		//$users = array($this -> usermodel -> getAll());
		$this -> output -> set_content_type('application/json');
		$this -> output -> set_output(json_encode($data));
	}
	
	function byId(){
		$this -> load -> model('usermodel');
		$data['user'] = $this -> usermodel -> getById($this->uri->slash_segment(3));
		$this -> output -> set_content_type('application/json');
		$this -> output -> set_output(json_encode($data), JSON_FORCE_OBJECT);
	}

}
?>