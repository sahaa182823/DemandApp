package com.cognizant.assetservice.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cognizant.assetservice.pojo.Asset;
import com.cognizant.assetservice.repository.AssetRepository;

@Service
public class AssetService {
	
	@Autowired
	private AssetRepository<Asset> assetRepository;
	
	@Transactional
	public boolean addAsset(Asset asset) {
		return assetRepository.save(asset) != null;
	}


}
