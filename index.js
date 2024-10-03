const inquirer = require("inquirer");
const promisePool = require("./config/connection");

const mistake = "If you wish to exit the prompt, PUSH Ctrl + C to Exit.";
const mistakeYellow = `\x1b[33m${mistake}\x1b[0m`;

const mainChoices = [
  "View All Properties",
  "View Property by State",
  "Add Property",
  "Update Property", 
  "Delete Property", 
  "View All States with Properties",
  "View Property Cost Management",
  "View Property Cost Management by State",
  "Quit",
];


const promptUser = async () => {
  const answers = await inquirer.prompt([
    {
      type: "list",
      name: "main",
      message: `

   

══════════════════════██════█████
═════════════════════█▒▒█═══█▒▒▒█
════════════════════█▒▒▒▒█══█▒▒▒█
══════════════════██▒▒▒▒▒▒█═█▒▒▒█
═════════════════█▒▒▒▒▒▒▒▒▒██▒▒▒█
════════════════█▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒█
═══════════════█▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒█
════════════█▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒██
═════════██▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒█
═══════███▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒███
════════██▒▒▒▒▒██████▒▒▒▒████████▒▒▒██
═════════█▒▒▒▒▒██████▒▒▒▒████████▒▒▒█
═════════█▒▒▒▒▒██████▒▒▒▒████████▒▒▒█
██████████▒▒▒▒▒██████▒▒▒▒████████▒▒▒███████
██████████▒▒▒▒▒██████▒▒▒▒████████▒▒▒███████
██████████▒▒▒▒▒██████▒▒▒▒████████▒▒▒███████
██████████▒▒▒▒▒██████▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒███████
███████████████████████████████████████████
███████████░░░░░░██████████████████████████
███████░░░░░░██████  WELCOME TO  ██████████
█████░░░░░░███████████████  PROPERTY  █████
█████░░░░░░██████████████████  MANAGER  ███
█████░░░░░░░░██████████████████████████████
██████░░░░░░░░░░░░█████████████████████████
████████░░░░░░░░░░░░░░░░███████████████████
      \nWhat would you like to do?\n\n`,
      choices: mainChoices,
    },
  ]);
  //The switch method here is creating a series of clauses, when the answer is selected, then the function
  //will be executed.
  switch (answers.main) {
    case "View All Properties":
      await viewAllProperties();
      break;

    case "View Property by State":
      await viewPropertybyState();
      break;


    case "Add Property":
      await addProperty();
      break;

    case "Update Property":
      await updateProperty();
      break;

    case "Delete Property":
      await deleteProperty();
      break;

    case "View All States with Properties":
      await viewAllStates();
      break;

      case "View Property Cost Management":
      await viewPropertyCostManagement();
      break;

      case "View Property Cost Management by State":
        await viewPropertyCostManagementByState();
        break;

    case "Quit":
      console.log("Quitting...");
      process.exit();

    default:
      console.log("Invalid choice");
  }
};

async function viewAllStates() {
  try {
    // Fetch and display states with associated properties
    const [rows] = await promisePool.query(`
      SELECT DISTINCT
        s.id AS StateId,
        s.name AS StateName,
        COUNT(p.id) AS PropertyCount
      FROM State s
      LEFT JOIN Property p ON s.id = p.state_id
      GROUP BY s.id, s.name
      HAVING PropertyCount > 0
    `);

    if (rows.length === 0) {
      console.log("No states with properties found.");
    } else {
      console.table(rows);
    }
  } catch (error) {
    console.error("Error fetching States:", error.message);
  } finally {
    promptUser();
  }
}

async function viewAllCities() {
  try {
    // Fetch and display roles with department names
    const [rows] = await promisePool.query(`
      SELECT c.id, c.Title, s.name AS State, r.Property-Cost
      FROM City c
      JOIN State s ON c.state_id = s.id
    `);
    console.table(rows);
  } catch (error) {
    console.error("Error fetching Cities:", error.message);
  } finally {
    promptUser();
  }
}

async function viewAllProperties() {
  try {
    // Fetch and display properties with their associated city, state, and type
    const [rows] = await promisePool.query(`
    SELECT DISTINCT
      p.id,
      p.address,
      p.zip_code,
      pt.TypeName AS PropertyType,
      p.PropertyCost,
      c.Title AS City,
      s.name AS State
    FROM Property p
    LEFT JOIN City c ON p.city_id = c.id
    LEFT JOIN State s ON p.state_id = s.id
    LEFT JOIN PropertyType pt ON p.type_id = pt.id
  `);


    if (rows.length === 0) {
      console.log("No properties found.");
    } else {
      console.table(rows);
    }
  } catch (error) {
    console.error("Error fetching Properties:", error.message);
    console.error("Query:", error.sql);
  } finally {
    promptUser();
  }
}

async function addProperty() {
  try {
    const [cities] = await promisePool.query("SELECT id, Title FROM City");
    const [states] = await promisePool.query("SELECT id, name FROM State");
    const [propertyTypes] = await promisePool.query("SELECT id, TypeName FROM PropertyType");

    // Prompt user for property information
    const propertyData = await inquirer.prompt([
      {
        type: "input",
        name: "address",
        message: "Enter property address:",
      },
      {
        type: "input",
        name: "zipCode",
        message: "Enter property zip code:",
      },
      {
        type: "input",
        name: "propertyCost",
        message: "Enter property cost:",
      },
      {
        type: "list",
        name: "stateName",
        message: "Select property state:",
        choices: states.map((state) => state.name),
      },
      {
        type: "input",
        name: "cityTitle",
        message: "Enter property city:",
      },
      {
        type: "list",
        name: "typeId",
        message: "Select property type:",
        choices: propertyTypes.map((type) => ({ name: type.TypeName, value: type.id })),
      },
     
      {
        type: "input",
        name: "monthlyMortgageCost",
        message: "Enter monthly mortgage cost:",
      },

      {
        type: "input",
        name: "annualIncome",
        message: "Enter annual income of the property:",
      },
    ]);

    // Find or insert the state based on user input
    const [state] = await promisePool.query("SELECT id, property_tax_percentage FROM State WHERE name = ?", [propertyData.stateName]);
    if (!state.length) {
      // Insert the new state
      const [stateResult] = await promisePool.execute("INSERT INTO State (name) VALUES (?)", [propertyData.stateName]);
      propertyData.stateId = stateResult.insertId;
      propertyData.propertyTaxPercentage = 0; // Set a default property tax percentage if not found
    } else {
      propertyData.stateId = state[0].id;
      propertyData.propertyTaxPercentage = state[0].property_tax_percentage;
    }

    // Find or insert the city based on user input
    const [city] = await promisePool.query("SELECT id FROM City WHERE Title = ?", [propertyData.cityTitle]);
    if (!city.length) {
      // Insert the new city
      const [cityResult] = await promisePool.execute("INSERT INTO City (Title, state_id, PropertyCost) VALUES (?, ?, ?)",
        [propertyData.cityTitle, propertyData.stateId, propertyData.propertyCost]);
      propertyData.cityId = cityResult.insertId;
    } else {
      propertyData.cityId = city[0].id;
    }

      // Calculate property tax cost based on property tax percentage and total property cost
      propertyData.propertyTaxCost = (propertyData.propertyCost * propertyData.propertyTaxPercentage) / 100;

      // Calculate annual mortgage cost based on monthly mortgage cost
      propertyData.annualMortgageCost = propertyData.monthlyMortgageCost * 12;
    // Insert the property with the selected city, type, property tax cost, annual mortgage cost, and annual income
    await promisePool.execute(
      "INSERT INTO Property (Address, zip_code, PropertyCost, city_id, state_id, type_id, property_tax_cost, annual_mortgage_cost, annual_income) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        propertyData.address,
        propertyData.zipCode,
        propertyData.propertyCost,
        propertyData.cityId,
        propertyData.stateId,
        propertyData.typeId,
        propertyData.propertyTaxCost,
        propertyData.annualMortgageCost,
        propertyData.annualIncome,
      ]
    );

    console.log("Property added successfully!");
  } catch (error) {
    console.error("Error adding property:", error.message);
  } finally {
    promptUser();
  }
}




async function updateProperty() {
  try {
    // Fetch and display properties for user to choose which one to update
    const [properties] = await promisePool.query("SELECT id, address FROM Property");
    
    const propertyChoices = properties.map((property) => ({
      name: property.address,
      value: property.id,
    }));

    // Prompt user to select a property to update
    const selectedProperty = await inquirer.prompt([
      {
        type: "list",
        name: "propertyId",
        message: "Select a property to update:",
        choices: propertyChoices,
      },
    ]);

    // Prompt user for updated property information
    const updatedPropertyData = await inquirer.prompt([
      {
        type: "input",
        name: "newAddress",
        message: "Enter updated property address:",
      },
      {
        type: "input",
        name: "newZipCode",
        message: "Enter updated property zip code:",
      },
      {
        type: "input",
        name: "newPropertyCost",
        message: "Enter updated property cost:",
      },
    ]);

    // Update the property in the database
    await promisePool.execute(
      "UPDATE Property SET address = ?, zip_code = ?, PropertyCost = ? WHERE id = ?",
      [
        updatedPropertyData.newAddress,
        updatedPropertyData.newZipCode,
        updatedPropertyData.newPropertyCost,
        selectedProperty.propertyId,
      ]
    );

    console.log("Property updated successfully!");
  } catch (error) {
    console.error("Error updating property:", error.message);
  } finally {
    promptUser();
  }
}


const viewPropertybyState = async () => {
  try {
    // Fetch and display states with associated properties
    const [stateRows] = await promisePool.query(`
      SELECT DISTINCT
        s.id AS StateId,
        s.name AS StateName
      FROM State s
      JOIN Property p ON s.id = p.state_id
    `);

    if (stateRows.length === 0) {
      console.log("No states with properties found.");
      return;
    }

    const stateSelection = await inquirer.prompt({
      type: "list",
      name: "stateName",
      message: "Select a state:",
      choices: stateRows.map((state) => ({
        name: state.StateName,
        value: state.StateId,
      })),
    });

    // Fetch and display properties for the selected state, including property type
    const [propertyRows] = await promisePool.query(`
      SELECT
        p.id,
        p.address,
        p.zip_code,
        c.Title AS City,
        s.name AS State,
        pt.TypeName AS PropertyType,
        p.PropertyCost
      FROM Property p
      JOIN City c ON p.city_id = c.id
      LEFT JOIN State s ON p.state_id = s.id
      LEFT JOIN PropertyType pt ON p.type_id = pt.id
      WHERE s.id = ?;
    `, [stateSelection.stateName]);

    console.table(propertyRows);
  } catch (error) {
    console.error("Error fetching properties by state:", error.message);
  } finally {
    promptUser();
  }
};

async function deleteProperty() {
  try {
    // Fetch properties with associated city and state to display for user selection
    const [properties] = await promisePool.query(`
      SELECT
        p.id,
        p.address,
        c.Title AS cityTitle,
        s.name AS stateName
      FROM Property p
      JOIN City c ON p.city_id = c.id
      JOIN State s ON p.state_id = s.id
    `);

    // Prompt user to select a property to delete
    const propertySelection = await inquirer.prompt([
      {
        type: "list",
        name: "propertyId",
        message: `Select the property to delete:  ${mistakeYellow}`,
        choices: properties.map((property) => ({
          name: `${property.address} (${property.cityTitle}, ${property.stateName})`,
          value: property.id
        })),
      },
    ]);

    // Delete the selected property from the database
    await promisePool.execute("DELETE FROM Property WHERE id = ?", [propertySelection.propertyId]);

    console.log("Property deleted successfully!");
  } catch (error) {
    console.error("Error deleting property:", error.message);
  } finally {
    // Prompt user again after completion
    await promptUser();
  }
}

async function viewPropertyCostManagement() {
  try {
    // Fetch and display property cost management details
    const [rows] = await promisePool.query(`
      SELECT
        p.id AS PropertyId,
        p.address,
        p.PropertyCost,
        p.property_tax_cost AS PropertyTaxCost,
        p.annual_mortgage_cost AS AnnualMortgageCost,
        p.annual_income AS AnnualIncome,
        (p.annual_income - p.annual_mortgage_cost - p.property_tax_cost) AS TotalRevenue
      FROM Property p
      LEFT JOIN City c ON p.city_id = c.id
      LEFT JOIN State s ON p.state_id = s.id
    `);

    if (rows.length === 0) {
      console.log("No properties found.");
    } else {
      console.table(rows);
    }
  } catch (error) {
    console.error("Error fetching Property Cost Management details:", error.message);
  } finally {
    promptUser();
  }
}

async function viewPropertyCostManagementByState() {
  try {
    // Fetch available states with properties
    const [stateRows] = await promisePool.query(`
      SELECT DISTINCT s.name
      FROM Property p
      JOIN State s ON p.state_id = s.id
    `);

    if (stateRows.length === 0) {
      console.log("No states with properties found.");
      return;
    }

    // Prompt user to choose a state
    const statePrompt = await inquirer.prompt({
      type: "list",
      name: "selectedState",
      message: "Select a state:",
      choices: stateRows.map((row) => row.name),
    });

    const selectedState = statePrompt.selectedState;

    // Fetch and display property cost management details for the selected state
    const [summaryRows] = await promisePool.query(`
      SELECT
        s.name AS State,
        SUM(p.property_tax_cost) AS TotalPropertyTaxCost,
        SUM(p.annual_mortgage_cost) AS TotalAnnualMortgageCost,
        SUM(p.annual_income) AS TotalAnnualIncome,
        SUM(p.annual_income - p.annual_mortgage_cost - p.property_tax_cost) AS TotalRevenue
      FROM Property p
      JOIN City c ON p.city_id = c.id
      JOIN State s ON p.state_id = s.id
      WHERE s.name = ?
    `, [selectedState]);

    if (summaryRows.length === 0) {
      console.log(`No properties found for ${selectedState}.`);
    } else {
      console.table(summaryRows);
    }
  } catch (error) {
    console.error("Error fetching Property Cost Management by State:", error.message);
  } finally {
    promptUser();
  }
}
// Initial call to start the application

promptUser();
