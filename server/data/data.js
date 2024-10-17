const laptopData = [
    {
        "id": 1,
        "name": "Dell XPS 13",
        "brand": "Dell",
        "base_price": 999.99,
        "form_factor": "Ultrabook",
        "display_type": "LED",
        "processor_type": "Intel i7",
        "image": "https://example.com/dell-xps-13.jpg",
        "description": "A sleek and powerful ultrabook perfect for professionals."
    },
    {
        "id": 2,
        "name": "Apple MacBook Air",
        "brand": "Apple",
        "base_price": 1199.99,
        "form_factor": "Ultrabook",
        "display_type": "Retina",
        "processor_type": "Apple M1",
        "image": "https://example.com/macbook-air.jpg",
        "description": "The lightweight and portable laptop with impressive performance."
    },
    {
        "id": 3,
        "name": "HP Spectre x360",
        "brand": "HP",
        "base_price": 1299.99,
        "form_factor": "Convertible",
        "display_type": "OLED",
        "processor_type": "Intel i7",
        "image": "https://example.com/hp-spectre-x360.jpg",
        "description": "A versatile laptop that adapts to your needs with its 360-degree hinge."
    },
    {
        "id": 4,
        "name": "Lenovo ThinkPad X1 Carbon",
        "brand": "Lenovo",
        "base_price": 1399.99,
        "form_factor": "Ultrabook",
        "display_type": "IPS",
        "processor_type": "Intel i7",
        "image": "https://example.com/lenovo-thinkpad-x1.jpg",
        "description": "A business laptop known for its durability and performance."
    },
    {
        "id": 5,
        "name": "Asus ROG Zephyrus G14",
        "brand": "Asus",
        "base_price": 1499.99,
        "form_factor": "Gaming",
        "display_type": "LED",
        "processor_type": "AMD Ryzen 9",
        "image": "https://example.com/asus-rog-zephyrus.jpg",
        "description": "A powerful gaming laptop with a compact design."
    }
];

const featureGroupData = [
    {
        "id": 1,
        "name": "Keyboard",
        "description": "Options to customize the keyboard."
    },
    {
        "id": 2,
        "name": "Storage",
        "description": "Options for additional storage."
    },
    {
        "id": 3,
        "name": "Display",
        "description": "Options to upgrade the display."
    },
    {
        "id": 4,
        "name": "Memory",
        "description": "Options for upgrading memory (RAM)."
    },
    {
        "id": 5,
        "name": "Graphics",
        "description": "Options for graphics card upgrades."
    }
];

const featureData = [
    {
        "id": 1,
        "name": "Backlit Keyboard",
        "description": "Upgrade to a backlit keyboard for typing in low light.",
        "additional_cost": 50.00,
        "feature_group_id": 1,
        "available_for_form_factor": "All"
    },
    {
        "id": 2,
        "name": "Mechanical Keyboard",
        "description": "Choose a mechanical keyboard for enhanced typing experience.",
        "additional_cost": 100.00,
        "feature_group_id": 1,
        "available_for_form_factor": "All"
    },
    {
        "id": 3,
        "name": "1TB SSD",
        "description": "Upgrade to a 1TB solid-state drive for faster performance.",
        "additional_cost": 150.00,
        "feature_group_id": 2,
        "available_for_form_factor": "All"
    },
    {
        "id": 4,
        "name": "2TB HDD",
        "description": "Add a 2TB hard disk drive for additional storage.",
        "additional_cost": 100.00,
        "feature_group_id": 2,
        "available_for_form_factor": "All"
    },
    {
        "id": 5,
        "name": "4K OLED Display",
        "description": "Upgrade to a stunning 4K OLED display.",
        "additional_cost": 300.00,
        "feature_group_id": 3,
        "available_for_form_factor": "Ultrabook, Convertible"
    },
    {
        "id": 6,
        "name": "FHD Display",
        "description": "Choose a full HD display for clear visuals.",
        "additional_cost": 200.00,
        "feature_group_id": 3,
        "available_for_form_factor": "All"
    },
    {
        "id": 7,
        "name": "16GB RAM",
        "description": "Upgrade to 16GB of RAM for better multitasking performance.",
        "additional_cost": 75.00,
        "feature_group_id": 4,
        "available_for_form_factor": "All"
    },
    {
        "id": 8,
        "name": "32GB RAM",
        "description": "Upgrade to 32GB of RAM for high-end performance.",
        "additional_cost": 150.00,
        "feature_group_id": 4,
        "available_for_form_factor": "All"
    },
    {
        "id": 9,
        "name": "NVIDIA GeForce GTX 1650",
        "description": "Upgrade to NVIDIA GeForce GTX 1650 for enhanced gaming performance.",
        "additional_cost": 250.00,
        "feature_group_id": 5,
        "available_for_form_factor": "Gaming"
    },
    {
        "id": 10,
        "name": "AMD Radeon RX 6800S",
        "description": "Upgrade to AMD Radeon RX 6800S for exceptional gaming performance.",
        "additional_cost": 300.00,
        "feature_group_id": 5,
        "available_for_form_factor": "Gaming"
    }
];

export { laptopData, featureGroupData, featureData };
