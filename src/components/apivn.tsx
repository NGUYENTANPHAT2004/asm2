import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MenuItem, Select, InputLabel, FormControl } from '@mui/material';

// Định nghĩa các interface TypeScript
interface Province {
    name: string;
    slug: string;
    type: string;
    name_with_type: string;
    code: string;
}

interface District {
    name: string;
    type: string;
    slug: string;
    name_with_type: string;
    path: string;
    path_with_type: string;
    code: string;
    parent_code: string;
}

interface Ward {
    name: string;
    type: string;
    slug: string;
    name_with_type: string;
    path: string;
    path_with_type: string;
    code: string;
    parent_code: string;
}

const ProvinceList: React.FC = () => {
    const [provinces, setProvinces] = useState<Province[]>([]);
    const [districts, setDistricts] = useState<District[]>([]);
    const [wards, setWards] = useState<Ward[]>([]);
    const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
    const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
    const [selectedwards, setSelectedWards] = useState<string | null>(null);
    const [filteredDistricts, setFilteredDistricts] = useState<District[]>([]);
    const [filteredWards, setFilteredWards] = useState<Ward[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Gọi API để lấy dữ liệu provinces
                const provinceResponse = await axios.get('/data/provinces.json');
                setProvinces(Object.values(provinceResponse.data));

                // Gọi API để lấy dữ liệu districts
                const districtResponse = await axios.get('/data/districts.json');
                setDistricts(Object.values(districtResponse.data));

                // Gọi API để lấy dữ liệu wards
                const wardResponse = await axios.get('/data/wards.json');
                setWards(Object.values(wardResponse.data));
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (selectedProvince) {
            const provinceDistricts = districts.filter(d => d.parent_code === selectedProvince);
            setFilteredDistricts(provinceDistricts);

            // Debugging: Log các quận huyện và xã phường
            console.log('Filtered Districts:', provinceDistricts);
            console.log('All Wards:', wards);

            // Reset quận huyện và xã phường đã chọn khi thay đổi tỉnh thành
            setSelectedDistrict(null);
            setSelectedWards(null);
            setFilteredWards([]);
        } else {
            setFilteredDistricts([]);
            setFilteredWards([]);
        }
    }, [selectedProvince, districts]);

    useEffect(() => {
        if (selectedDistrict) {
            const allWards = wards.filter(w => w.parent_code === selectedDistrict);
            setFilteredWards(allWards);

            // Reset xã phường đã chọn khi thay đổi quận huyện
            setSelectedWards(null);
        } else {
            setFilteredWards([]);
        }
    }, [selectedDistrict, wards]);

    return (
        <div>
            <FormControl fullWidth margin="normal">
                <InputLabel id="province-select-label">Chọn tỉnh thành</InputLabel>
                <Select
                    labelId="province-select-label"
                    value={selectedProvince || ''}
                    onChange={(e) => setSelectedProvince(e.target.value as string)}
                    displayEmpty
                >
                    <MenuItem value="" disabled>Chọn tỉnh thành</MenuItem>
                    {provinces.map(p => (
                        <MenuItem key={p.code} value={p.code}>{p.name}</MenuItem>
                    ))}
                </Select>
            </FormControl>

            {selectedProvince && (
                <FormControl fullWidth margin="normal">
                    <InputLabel id="district-select-label">Chọn quận huyện</InputLabel>
                    <Select
                        labelId="district-select-label"
                        value={selectedDistrict || ''}
                        onChange={(e) => setSelectedDistrict(e.target.value as string)}
                        displayEmpty
                    >
                        <MenuItem value="" disabled>Chọn quận huyện</MenuItem>
                        {filteredDistricts.map(d => (
                            <MenuItem key={d.code} value={d.code}>{d.name_with_type}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            )}

            {selectedDistrict && (
                <FormControl fullWidth margin="normal">
                    <InputLabel id="ward-select-label">Chọn xã phường</InputLabel>
                    <Select
                        labelId="ward-select-label"
                        value={selectedwards || ''}
                        onChange={(e) => setSelectedWards(e.target.value as string)}
                        displayEmpty
                    >
                        <MenuItem value="" disabled>Chọn xã phường</MenuItem>
                        {filteredWards.map(w => (
                            <MenuItem key={w.code} value={w.code}>{w.name_with_type}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            )}
        </div>
    );
};

export default ProvinceList;
