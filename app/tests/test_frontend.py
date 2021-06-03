import unittest
from selenium import webdriver

class Test_Frontend(unittest.TestCase):
    """Test the front-end integration"""

    def setUp(self):
        """Set up function to set the beb driver, using Chrome"""
        self.driver = webdriver.Chrome('./chromedriver')

    def test_popup(self):
        """Link to the About popup and display detailed information and then close the about-popup"""
        driver = self.driver
        driver.get("http://127.0.0.1:5000/dashboard/home/")

        """simulate to click the About button """
        driver.find_element_by_id("about-button").click()
        driver.find_element_by_id("about-close-button").click()
        driver.delete_all_cookies()

    def test_calculator(self):
        """Link to the dashboard to test the calculator by inputting dummy data values"""
        driver = self.driver
        driver.get("http://127.0.0.1:5000/dashboard/home/")

        """Send some values to the input boxes and click on the Calculate button then close the popup"""
        driver.find_element_by_id("creatinine clearance").click()
        driver.find_element_by_id("m-sex").click()
        driver.find_element_by_id("p-age").send_keys('76')
        driver.find_element_by_id("p-weight").send_keys('70.6')
        driver.find_element_by_id("p-serum").send_keys('117')
        driver.find_element_by_id("calculate-button").click()
        driver.find_element_by_id("cal-close-button").click()




if __name__ == "__main__":
    unittest.main()
